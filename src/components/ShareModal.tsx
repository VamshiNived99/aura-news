import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Share2, 
  Copy, 
  MessageCircle, 
  Twitter, 
  Facebook, 
  Linkedin, 
  Mail,
  Send
} from "lucide-react";
import {
  ShareContent,
  shareContent,
  getWhatsAppShareUrl,
  getTelegramShareUrl,
  getTwitterShareUrl,
  getFacebookShareUrl,
  getLinkedInShareUrl,
  getEmailShareUrl
} from "@/utils/shareUtils";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: ShareContent;
}

const ShareModal = ({ isOpen, onClose, content }: ShareModalProps) => {
  const { toast } = useToast();

  const handleNativeShare = async () => {
    const success = await shareContent(content);
    if (success) {
      toast({ title: "Shared successfully!" });
      onClose();
    } else {
      toast({ title: "Share cancelled" });
    }
  };

  const handleCopyLink = async () => {
    const fullText = `${content.text}\n\n${content.url}`;
    await navigator.clipboard.writeText(fullText);
    toast({ title: "Link copied to clipboard!" });
    onClose();
  };

  const openShareUrl = (url: string) => {
    window.open(url, '_blank', 'width=600,height=400');
    onClose();
  };

  const shareOptions = [
    {
      name: 'WhatsApp',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
      onClick: () => openShareUrl(getWhatsAppShareUrl(content.text, content.url))
    },
    {
      name: 'Telegram',
      icon: Send,
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => openShareUrl(getTelegramShareUrl(content.text, content.url))
    },
    {
      name: 'Twitter',
      icon: Twitter,
      color: 'bg-sky-500 hover:bg-sky-600',
      onClick: () => openShareUrl(getTwitterShareUrl(content.title, content.url))
    },
    {
      name: 'Facebook',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
      onClick: () => openShareUrl(getFacebookShareUrl(content.url))
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: 'bg-blue-700 hover:bg-blue-800',
      onClick: () => openShareUrl(getLinkedInShareUrl(content.title, content.url))
    },
    {
      name: 'Email',
      icon: Mail,
      color: 'bg-gray-600 hover:bg-gray-700',
      onClick: () => window.location.href = getEmailShareUrl(content.title, `${content.text}\n\n${content.url}`)
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Preview */}
          <div className="p-3 bg-secondary/50 rounded-lg">
            <p className="text-sm font-medium line-clamp-2">{content.title}</p>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{content.text}</p>
          </div>

          {/* Share Options Grid */}
          <div className="grid grid-cols-3 gap-3">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <Button
                  key={option.name}
                  onClick={option.onClick}
                  className={`flex flex-col items-center gap-2 h-auto py-3 ${option.color} text-white`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs">{option.name}</span>
                </Button>
              );
            })}
          </div>

          {/* Additional Actions */}
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              onClick={handleCopyLink}
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Link
            </Button>
            {typeof navigator.share === 'function' && (
              <Button 
                variant="default" 
                className="flex-1"
                onClick={handleNativeShare}
              >
                <Share2 className="w-4 h-4 mr-2" />
                More
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;