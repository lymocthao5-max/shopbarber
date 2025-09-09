import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Minimize2, 
  Maximize2,
  Phone,
  Calendar,
  Scissors,
  Star,
  Clock
} from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Xin chào! Tôi là trợ lý AI của Elite Cuts. Tôi có thể giúp bạn đặt lịch, tư vấn dịch vụ hoặc trả lời các câu hỏi về barbershop. Bạn cần hỗ trợ gì?',
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickReplies = [
    { text: 'Đặt lịch hẹn', icon: Calendar },
    { text: 'Xem dịch vụ', icon: Scissors },
    { text: 'Giá cả', icon: Star },
    { text: 'Giờ mở cửa', icon: Clock },
    { text: 'Liên hệ', icon: Phone }
  ];

  const botResponses = {
    'đặt lịch': 'Tuyệt vời! Bạn có thể đặt lịch trực tiếp trên website hoặc gọi 0901 234 567. Chúng tôi có các khung giờ từ 9:00 - 18:00 hàng ngày. Bạn muốn đặt lịch cho ngày nào?',
    'dịch vụ': 'Chúng tôi có 4 gói dịch vụ chính:\n• Cắt Tóc & Tạo Kiểu Đặc Biệt (850.000đ)\n• Liệu Trình Hoàng Gia (1.500.000đ)\n• Tạo Kiểu Nhanh (450.000đ)\n• Trải Nghiệm VIP (2.000.000đ)\n\nBạn quan tâm đến dịch vụ nào?',
    'giá': 'Bảng giá dịch vụ của chúng tôi:\n• Tạo Kiểu Nhanh: 450.000đ (30 phút)\n• Cắt Tóc Đặc Biệt: 850.000đ (60 phút)\n• Liệu Trình Hoàng Gia: 1.500.000đ (90 phút)\n• Trải Nghiệm VIP: 2.000.000đ (120 phút)\n\nTất cả dịch vụ đều bao gồm tư vấn miễn phí!',
    'giờ': 'Giờ hoạt động của Elite Cuts:\n• Thứ 2 - Chủ nhật: 9:00 - 18:00\n• Nghỉ các ngày lễ lớn\n• Đặt lịch trước để đảm bảo có chỗ\n\nBạn muốn đặt lịch cho khung giờ nào?',
    'liên hệ': 'Thông tin liên hệ Elite Cuts:\n📞 Hotline: 0901 234 567\n📍 Địa chỉ: 123 Nguyễn Huệ, Quận 1, TP.HCM\n✉️ Email: info@elitecuts.vn\n🌐 Website: elitecuts.vn\n\nChúng tôi luôn sẵn sàng phục vụ bạn!'
  };

  const generateBotResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('đặt lịch') || message.includes('book') || message.includes('hẹn')) {
      return botResponses['đặt lịch'];
    } else if (message.includes('dịch vụ') || message.includes('service')) {
      return botResponses['dịch vụ'];
    } else if (message.includes('giá') || message.includes('price') || message.includes('cost')) {
      return botResponses['giá'];
    } else if (message.includes('giờ') || message.includes('time') || message.includes('mở cửa')) {
      return botResponses['giờ'];
    } else if (message.includes('liên hệ') || message.includes('contact') || message.includes('địa chỉ')) {
      return botResponses['liên hệ'];
    } else if (message.includes('xin chào') || message.includes('hello') || message.includes('hi')) {
      return 'Xin chào! Rất vui được hỗ trợ bạn. Tôi có thể giúp bạn đặt lịch, tư vấn dịch vụ hoặc cung cấp thông tin về Elite Cuts. Bạn cần hỗ trợ gì?';
    } else if (message.includes('cảm ơn') || message.includes('thank')) {
      return 'Rất vui được hỗ trợ bạn! Nếu cần thêm thông tin gì, đừng ngại liên hệ. Chúc bạn một ngày tuyệt vời! 😊';
    } else {
      return 'Tôi hiểu bạn đang quan tâm đến điều đó. Để được hỗ trợ tốt nhất, bạn có thể:\n• Gọi hotline: 0901 234 567\n• Đặt lịch trực tiếp trên website\n• Ghé thăm cửa hàng tại 123 Nguyễn Huệ, Q1\n\nHoặc bạn có thể hỏi tôi về dịch vụ, giá cả, giờ mở cửa nhé!';
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (text: string) => {
    setInputValue(text);
    handleSendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('vi-VN', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            >
              <MessageCircle className="w-8 h-8" />
            </Button>
            
            {/* Notification Badge */}
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white"
            >
              1
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 60 : 500
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <Card className="border-0 bg-gradient-to-br from-gray-900/95 to-black/95 backdrop-blur-md shadow-2xl overflow-hidden">
              {/* Chat Header */}
              <CardHeader className="p-4 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border-b border-purple-500/20">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full flex items-center justify-center">
                        <Bot className="w-6 h-6 text-white" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900"></div>
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">Trợ Lý AI</CardTitle>
                      <p className="text-sm text-gray-400">Elite Cuts Support</p>
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

              {/* Chat Content */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <CardContent className="p-0">
                      {/* Messages */}
                      <div className="h-80 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex items-start space-x-2 max-w-[80%] ${
                              message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                            }`}>
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                message.sender === 'user' 
                                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600' 
                                  : 'bg-gray-700'
                              }`}>
                                {message.sender === 'user' ? (
                                  <User className="w-4 h-4 text-white" />
                                ) : (
                                  <Bot className="w-4 h-4 text-white" />
                                )}
                              </div>
                              <div className={`rounded-2xl p-3 ${
                                message.sender === 'user'
                                  ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                                  : 'bg-gray-800 text-gray-200'
                              }`}>
                                <p className="text-sm whitespace-pre-line">{message.text}</p>
                                <p className={`text-xs mt-1 ${
                                  message.sender === 'user' ? 'text-purple-100' : 'text-gray-500'
                                }`}>
                                  {formatTime(message.timestamp)}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        
                        {/* Typing Indicator */}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="flex items-start space-x-2">
                              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                                <Bot className="w-4 h-4 text-white" />
                              </div>
                              <div className="bg-gray-800 rounded-2xl p-3">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
                                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        <div ref={messagesEndRef} />
                      </div>

                      {/* Quick Replies */}
                      <div className="p-4 border-t border-gray-700">
                        <div className="flex flex-wrap gap-2 mb-4">
                          {quickReplies.map((reply, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleQuickReply(reply.text)}
                              className="border-gray-700 text-gray-300 hover:bg-purple-600/20 hover:border-purple-500 text-xs"
                            >
                              <reply.icon className="w-3 h-3 mr-1" />
                              {reply.text}
                            </Button>
                          ))}
                        </div>

                        {/* Input */}
                        <div className="flex space-x-2">
                          <Input
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Nhập tin nhắn..."
                            className="bg-gray-800/50 border-gray-700 text-white flex-1"
                          />
                          <Button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;