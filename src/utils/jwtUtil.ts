/* eslint-disable no-async-promise-executor */
import type { JwtStatus } from '@/types/common';
import type { JwtPayload } from 'jwt-decode';
import { jwtDecode } from 'jwt-decode';
export const decodeJWT = (token: string): Promise<JwtPayload | null> => {
    return new Promise((resolve) => {
        if (token) {
            const decodedToken = jwtDecode<JwtPayload>(token);
            resolve(decodedToken);
        } else {
            resolve(null);
        }
    });
};
export const canRefreshToken = async (token: string, showLog = false, from: string | undefined = undefined): Promise<boolean> => {
    return new Promise(async (resolve) => {
        const decodeToken = await decodeJWT(token);
        if (decodeToken && decodeToken.exp) {
            const expirationTime = decodeToken.exp * 1000; // Convert to milliseconds
            const currentTime = new Date().getTime();
            const timeUntilExpiration = expirationTime - currentTime;
            const refreshThreshold = 5 * (60 * 1000); // 5 min
            const refeshIt = timeUntilExpiration < refreshThreshold;
            if (showLog) {
                console.log('jwtUtil > canRefreshToken > refeshIt : ' + refeshIt, decodeToken, 'from', from);
            }

            resolve(refeshIt);
        }

        resolve(false);
    });
};
export const getRefreshTokenTimeout = async (token: string): Promise<number> => {
    return new Promise(async (resolve) => {
        const decodeToken = await decodeJWT(token);
        if (decodeToken && decodeToken.exp) {
            const expires = new Date(decodeToken.exp * 1000);
            const timeout = expires.getTime() - Date.now() - (5 * (60 * 1000));
            resolve(timeout);
        }
        resolve(0);
    });
};
export const getTokenStatus = async (token: string): Promise<JwtStatus> => {
    return new Promise(async (resolve) => {
        try {
            const decodeToken = await decodeJWT(token);
            if (decodeToken && decodeToken.exp) {
                // Get the current time in seconds since the epoch
                // const currentTime = Math.floor(Date.now() / 1000);
                const currentTime = new Date().getTime() + 3000;// add 3 more seconds in case not expired when fetch new data from server
                const expirationTime = decodeToken.exp * 1000; // Convert to milliseconds
                // Check if the token is expired
                if (decodeToken && currentTime > expirationTime) {
                    // if (decodeToken && currentTime > decodeToken.exp) {
                    resolve('EXPIRED');
                } else {
                    resolve('VALID');
                }
            } else {
                resolve('NO_EXPIRATION_TIME');
            }
        } catch (err) {
            resolve('INVALID');
        }
    });
};