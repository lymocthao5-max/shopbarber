import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Phone, 
  Mail, 
  Clock,
  Star,
  Smile,
  Paperclip,
  Mic,
  Video,
  Minimize2,
  Maximize2
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot' | 'agent';
  content: string;
  timestamp: Date;
  status?: 'sending' | 'sent' | 'read';
  suggestions?: string[];
}

interface Agent {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'busy' | 'offline';
  speciality: string;
  rating: number;
  responseTime: string;
}

const LiveChatSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState<Agent | null>(null);
  const [chatMode, setChatMode] = useState<'bot' | 'agent'>('bot');
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const agents: Agent[] = [
    {
      id: '1',
      name: 'Nguyễn Thị Lan',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      speciality: 'Tư vấn dịch vụ',
      rating: 4.9,
      responseTime: '< 2 phút'
    },
    {
      id: '2',
      name: 'Trần Văn Minh',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      status: 'online',
      speciality: 'Hỗ trợ kỹ thuật',
      rating: 4.8,
      responseTime: '< 3 phút'
    }
  ];

  const quickReplies = [
    'Tôi muốn đặt lịch',
    'Giá cả dịch vụ',
    'Địa chỉ cửa hàng',
    'Thời gian hoạt động',
    'Khuyến mãi hiện tại'
  ];

  const botResponses = {
    'tôi muốn đặt lịch': 'Tuyệt vời! Tôi sẽ giúp bạn đặt lịch. Bạn muốn đặt lịch cho dịch vụ nào và thời gian nào?',
    'giá cả dịch vụ': 'Dưới đây là bảng giá dịch vụ của chúng tôi:\n• Cắt tóc cơ bản: 150.000đ\n• Premium Cut + Styling: 300.000đ\n• AI Style Consultation: 200.000đ\n• VIP Package: 500.000đ',
    'địa chỉ cửa hàng': 'Chúng tôi có 3 chi nhánh:\n• CN1: 123 Nguyễn Huệ, Q1, TP.HCM\n• CN2: 456 Trần Hưng Đạo, Q5, TP.HCM\n• CN3: 789 Lê Văn Việt, Q9, TP.HCM',
    'thời gian hoạt động': 'Giờ hoạt động:\n• Thứ 2-6: 8:00 - 22:00\n• Thứ 7-CN: 7:00 - 23:00\n• Các ngày lễ: 9:00 - 21:00',
    'khuyến mãi hiện tại': 'Khuyến mãi tháng này:\n• Giảm 20% cho khách hàng mới\n• Tặng voucher 100k cho gói VIP\n• Ưu đãi combo cắt + gội + massage'
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        type: 'bot',
        content: 'Xin chào! Tôi là AI Assistant của Elite Cuts. Tôi có thể giúp gì cho bạn hôm nay?',
        timestamp: new Date(),
        suggestions: quickReplies
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date(),
      status: 'sent'
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse = getBotResponse(currentInput.toLowerCase());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: chatMode === 'bot' ? 'bot' : 'agent',
        content: botResponse,
        timestamp: new Date(),
        suggestions: chatMode === 'bot' ? getRandomSuggestions() : undefined
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const getBotResponse = (input: string): string => {
    for (const [key, response] of Object.entries(botResponses)) {
      if (input.includes(key)) {
        return response;
      }
    }
    
    if (input.includes('chuyển sang tư vấn viên') || input.includes('nói chuyện với người')) {
      setChatMode('agent');
      setCurrentAgent(agents[0]);
      return 'Tôi đang kết nối bạn với tư vấn viên. Vui lòng chờ trong giây lát...';
    }
    
    return 'Cảm ơn bạn đã liên hệ! Tôi đang tìm hiểu thông tin để hỗ trợ bạn tốt nhất. Bạn có thể nói rõ hơn về yêu cầu của mình không?';
  };

  const getRandomSuggestions = (): string[] => {
    const shuffled = [...quickReplies].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
  };

  const handleQuickReply = (reply: string) => {
    setInputValue(reply);
    setTimeout(() => handleSendMessage(), 100);
  };

  const connectToAgent = () => {
    setChatMode('agent');
    setCurrentAgent(agents[0]);
    const agentMessage: Message = {
      id: Date.now().toString(),
      type: 'agent',
      content: `Xin chào! Tôi là ${agents[0].name}, tư vấn viên của Elite Cuts. Tôi sẽ hỗ trợ bạn từ đây. Bạn cần tôi giúp gì?`,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, agentMessage]);
  };

  if (!isOpen) {
    return (
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(true)}
          className="relative w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse" />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <Card className={`w-96 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md border border-purple-500/30 shadow-2xl ${isMinimized ? 'h-16' : 'h-[600px]'} transition-all duration-300`}>
        {/* Header */}
        <CardHeader className="p-4 border-b border-purple-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {chatMode === 'bot' ? (
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900" />
                </div>
              ) : currentAgent ? (
                <div className="relative">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={currentAgent.avatar} alt={currentAgent.name} />
                    <AvatarFallback>{currentAgent.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-gray-900 ${
                    currentAgent.status === 'online' ? 'bg-green-500' : 
                    currentAgent.status === 'busy' ? 'bg-yellow-500' : 'bg-gray-500'
                  }`} />
                </div>
              ) : null}
              <div>
                <h3 className="text-white font-semibold">
                  {chatMode === 'bot' ? 'AI Assistant' : currentAgent?.name}
                </h3>
                <p className="text-xs text-gray-400">
                  {chatMode === 'bot' ? 'Trực tuyến 24/7' : currentAgent?.speciality}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-gray-400 hover:text-white"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="p-4 h-96 overflow-y-auto space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-xs ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
                      <div className={`p-3 rounded-2xl ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white' 
                          : 'bg-gray-800 text-gray-200'
                      }`}>
                        <p className="text-sm whitespace-pre-line">{message.content}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString('vi-VN', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </p>
                    </div>
                    <div className={`${message.type === 'user' ? 'order-1 mr-2' : 'order-2 ml-2'} flex-shrink-0`}>
                      {message.type === 'user' ? (
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-white" />
                        </div>
                      ) : message.type === 'bot' ? (
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <Bot className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={currentAgent?.avatar} alt={currentAgent?.name} />
                          <AvatarFallback>{currentAgent?.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-gray-800 p-3 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Replies */}
              {messages.length > 0 && messages[messages.length - 1].suggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-wrap gap-2"
                >
                  {messages[messages.length - 1].suggestions!.map((suggestion, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(suggestion)}
                      className="text-xs border-purple-500/50 text-purple-300 hover:bg-purple-500/10"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </CardContent>

            {/* Actions Bar */}
            {chatMode === 'bot' && (
              <div className="px-4 py-2 border-t border-purple-500/20">
                <div className="flex justify-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={connectToAgent}
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Chuyển tư vấn viên
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Gọi điện
                  </Button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-purple-500/20">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Nhập tin nhắn..."
                    className="w-full bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div className="flex space-x-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-gray-400 hover:text-white"
                  >
                    <Smile className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white rounded-full p-2"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </motion.div>
  );
};

export default LiveChatSupport;