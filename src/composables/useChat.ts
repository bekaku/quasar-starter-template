import { useChatStore } from '@/stores/chatStore';

export const useChat = () => {
    const chatStore = useChatStore();
    const onOpenMiniChat = (chatId: number | undefined) => {
        if (!chatId) {
            return;
        }
        chatStore.miniChatGroupId = chatId;
        chatStore.openMiniChatPage = true;
        chatStore.miniChatMinimize = false;
    };
    return {
        onOpenMiniChat
    };
};
