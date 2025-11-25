import React, { useState } from 'react';
import { Loader2, Sparkles } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  source: string;
  title: string;
  description: string;
  showUnlock?: boolean;
  onUnlock?: () => Promise<void>;
}

const ratingOptions = [1, 2, 3, 4, 5];

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  source,
  title,
  description,
  showUnlock = false,
  onUnlock,
}) => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [unlocking, setUnlocking] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim() && rating == null) {
      toast({
        title: t('beta.feedbackLabel'),
        description: t('beta.feedbackPlaceholder'),
      });
      return;
    }
    setSubmitting(true);
    try {
      await apiClient.submitBetaFeedback({ message: message.trim(), source, rating: rating ?? undefined });
      toast({ title: t('beta.feedbackThanks'), description: t('beta.modalSubtitle') });
      setMessage('');
      setRating(null);
      onClose();
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleUnlock = async () => {
    if (!onUnlock) return;
    setUnlocking(true);
    try {
      await onUnlock();
      toast({ title: t('beta.unlockTitle'), description: t('beta.unlockBody') });
      setUnlocking(false);
      onClose();
    } catch (error: any) {
      toast({
        title: t('auth.error'),
        description: error.message || t('auth.errorOccurred'),
        variant: 'destructive',
      });
      setUnlocking(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-background p-6 shadow-xl space-y-5">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t('feedback.prompt')}</label>
          <textarea
            className="w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            rows={4}
            placeholder={t('feedback.placeholder')}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <p className="text-sm font-medium">{t('feedback.rating')}</p>
          <div className="flex gap-2">
            {ratingOptions.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating((prev) => (prev === value ? null : value))}
                className={`h-9 w-9 rounded-full border ${
                  rating === value ? 'bg-primary text-white border-primary' : 'border-border text-foreground'
                }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="btn-primary flex-1 disabled:opacity-70"
            onClick={handleSubmit}
            disabled={submitting}
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : t('feedback.send')}
          </button>
          <button type="button" className="btn-secondary flex-1" onClick={onClose}>
            {t('feedback.cancel')}
          </button>
        </div>

        {showUnlock && onUnlock && (
          <div className="rounded-xl border border-dashed border-primary/40 p-4 space-y-3">
            <p className="text-sm text-foreground">{t('beta.unlockPrompt')}</p>
            <button
              type="button"
              className="btn-large btn-primary w-full disabled:opacity-70"
              onClick={handleUnlock}
              disabled={unlocking}
            >
              {unlocking ? <Loader2 className="h-4 w-4 animate-spin" /> : t('beta.unlockButton')}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackModal;
