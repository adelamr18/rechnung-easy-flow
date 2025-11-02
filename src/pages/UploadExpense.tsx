import React, { useState, useRef } from 'react';
import { Camera, Upload, Euro, FileText, Check } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';

const UploadExpense: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const { t } = useLanguage();
  const { toast } = useToast();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const handleCameraCapture = () => {
    if (cameraInputRef.current) {
      cameraInputRef.current.click();
    }
  };

  const handleFileUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: t('expenses.noReceiptSelected'),
        description: t('expenses.pleaseUpload'),
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    // Simulate saving expense
    setTimeout(() => {
      toast({
        title: t('expenses.saved'),
        description: t('expenses.savedDesc'),
      });

      // Reset form
      setSelectedFile(null);
      setPreviewUrl('');
      setAmount('');
      setNote('');
      
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="card-warm">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Camera className="h-8 w-8 text-warning" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">
            {t('expenses.title')}
          </h1>
          <p className="text-muted-foreground text-lg mt-2">
            {t('expenses.subtitle')}
          </p>
        </div>

        {/* Camera/Upload Section */}
        <div className="space-y-4 mb-8">
          {!selectedFile ? (
            <>
              {/* Camera Button */}
              <button
                type="button"
                onClick={handleCameraCapture}
                className="btn-large btn-primary w-full"
              >
                <Camera className="h-6 w-6" />
                {t('expenses.upload')}
              </button>

              {/* Upload Button */}
              <button
                type="button"
                onClick={handleFileUpload}
                className="btn-large btn-secondary w-full"
              >
                <Upload className="h-6 w-6" />
                {t('expenses.uploadFile')}
              </button>

              {/* Hidden file inputs */}
              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleFileSelect(file);
                }}
                className="hidden"
              />
            </>
          ) : (
            /* Preview Section */
            <div className="space-y-4">
              <div className="relative bg-muted rounded-lg p-4">
                <img
                  src={previewUrl}
                  alt="Receipt preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl('');
                  }}
                  className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold"
                >
                  ×
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-success">
                <Check className="h-5 w-5" />
                <span className="font-medium">{t('expenses.loadedSuccess')}</span>
              </div>
            </div>
          )}
        </div>

        {/* Form Section */}
        {selectedFile && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-foreground mb-2">
                {t('expenses.amount')}
              </label>
              <div className="relative">
                <Euro className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="input-large pl-12 w-full"
                  placeholder="25.50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="note" className="block text-sm font-medium text-foreground mb-2">
                {t('expenses.note')}
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-4 h-5 w-5 text-muted-foreground" />
                <textarea
                  id="note"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="input-large pl-12 w-full min-h-[100px] resize-none"
                  placeholder="Büromaterial, Tanken, etc..."
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-large btn-success w-full"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  {t('expenses.saving')}
                </>
              ) : (
                <>
                  <Check className="h-5 w-5" />
                  {t('expenses.save')}
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UploadExpense;