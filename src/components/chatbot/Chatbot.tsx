import React, { useState, useRef, useEffect } from "react";
import {
    Box,
    Typography,
    TextField,
    IconButton,
    Paper,
    Avatar,
    Badge,
    Zoom,
    CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { FiSend, FiMinimize2, FiMaximize2, FiX } from "react-icons/fi";
import { format } from "date-fns";

const ChatContainer = styled(Paper)(({ theme, isExpanded }) => ({
    position: "fixed",
    borderRadius: "10px",
    bottom: 20,
    right: 20,
    width: isExpanded ? 350 : 200,
    height: isExpanded ? 500 : 60,
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transition: "all 0.3s ease",
    zIndex: 1000,
    [theme.breakpoints.down("sm")]: {
        width: "calc(100% - 40px)",
        right: 20,
        left: 20,
    },
}));

const Header = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    padding: theme.spacing(1, 2),
    position: "sticky", // Keeps the header fixed at the top
    top: 0, // Position it at the top of the container
    zIndex: 10, // Ensure it stays above other elements
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: theme.palette.primary.contrastText,
}));

const MessagesContainer = styled(Box)(({ theme }) => ({
    flex: 1,
    overflowY: "auto", // Makes the container scrollable
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
    gap: theme.spacing(1),
    maxHeight: "calc(100% - 100px)", // Adjust for header and input container
}));

const MessageBubble = styled(Box)(({ theme, isUser }) => ({
    maxWidth: "70%",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(2),
    backgroundColor: isUser ? theme.palette.primary.light : theme.palette.primary.main,
    alignSelf: isUser ? "flex-end" : "flex-start",
    position: "relative",
}));

const InputContainer = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: `1px solid ${theme.palette.divider}`,
    display: "flex",
    gap: theme.spacing(1),
}));

const ChatBot = () => {
    const [isExpanded, setIsExpanded] = useState(true);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [isVisible, setIsVisible] = useState(false); // Visibility state
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Show the chat after a 5-second delay
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000); // 5000ms = 5 seconds

        return () => clearTimeout(timer); // Cleanup timer on component unmount
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: inputValue,
            isUser: true,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botMessage = {
                id: Date.now(),
                text: "Thank you for your message! This is a simulated response.",
                isUser: false,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <Zoom in={isVisible}> {/* Use Zoom for the fade-in effect */}
            <ChatContainer isExpanded={isExpanded} elevation={3}>
                <Header>
                    <Box display="flex" alignItems="center" gap={1}>
                        <Badge color="success" variant="dot" overlap="circular">
                            <Avatar
                                src="https://images.unsplash.com/photo-1531747118685-ca8fa6e08806"
                                alt="AI Assistant"
                            />
                        </Badge>
                        <Typography variant="h6">AI Assistant</Typography>
                    </Box>
                    <Box>
                        <IconButton
                            size="small"
                            onClick={() => setIsExpanded(!isExpanded)}
                            sx={{ color: "inherit" }}
                        >
                            {isExpanded ? <FiMinimize2 /> : <FiMaximize2 />}
                        </IconButton>
                        {/* <IconButton size="small" sx={{ color: "inherit" }}>
                            <FiX />
                        </IconButton> */}
                    </Box>
                </Header>

                <Box display="flex" flexDirection="column" flex={1}>
                    <MessagesContainer>
                        {messages.map((message) => (
                            <MessageBubble key={message.id} isUser={message.isUser}>
                                <Typography variant="body1">{message.text}</Typography>
                                <Typography
                                    variant="caption"
                                    sx={{ position: "absolute", bottom: -20, right: 8 }}
                                >
                                    {format(message.timestamp, "HH:mm")}
                                </Typography>
                            </MessageBubble>
                        ))}
                        {isTyping && (
                            <Box display="flex" alignItems="center" gap={1}>
                                <CircularProgress size={20} />
                                <Typography variant="body2">AI is typing...</Typography>
                            </Box>
                        )}
                        <div ref={messagesEndRef} />
                    </MessagesContainer>

                    <InputContainer>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            size="small"
                        />
                        <IconButton
                            color="primary"
                            disabled={!inputValue.trim()}
                            onClick={handleSend}
                        >
                            <FiSend />
                        </IconButton>
                    </InputContainer>
                </Box>
            </ChatContainer>
        </Zoom>
    );
};

export default ChatBot;
