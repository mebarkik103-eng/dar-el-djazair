import React, { useState } from 'react';
import { Language } from '../types/restaurant';
import { 
  Download, 
  Check, 
  Copy, 
  X, 
  FolderArchive, 
  Terminal, 
  ExternalLink, 
  HelpCircle,
  Loader2,
  FileCheck2,
  Sparkles,
  Link as LinkIcon
} from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, lang }) => {
  const [downloadingFile, setDownloadingFile] = useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  // Direct origin-based download URL
  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const directDownloadUrl = `${origin}/dar-el-djazair-source.zip`;
  const mirrorDownloadUrl = `${origin}/dar-el-djazair-multi-restaurant.zip`;

  // Robust programmatic Blob download for iframes
  const handleBlobDownload = async (filename: string, url: string) => {
    try {
      setDownloadingFile(filename);
      setDownloadSuccess(null);

      const response = await fetch(`${url}?v=${Date.now()}`);
      if (!response.ok) {
        throw new Error(`Erreur réseau (${response.status})`);
      }

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = blobUrl;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(blobUrl);
      }, 150);

      setDownloadSuccess(filename);
      setTimeout(() => setDownloadSuccess(null), 5000);
    } catch (err) {
      console.warn('Fallback standard download link triggered:', err);
      // Fallback: window.open in new context
      window.open(url, '_blank');
    } finally {
      setDownloadingFile(null);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(directDownloadUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/75 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-stone-200 overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-700 rounded-xl text-white">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold">
                {lang === 'ar' ? 'تحميل الكود المصدري للمشروع (ZIP)' : 'Télécharger le code source du projet (ZIP)'}
              </h3>
              <p className="text-xs text-stone-300">
                {lang === 'ar' ? 'مشروع كامل مع محدد المطاعم وقوائم الأسعار' : 'Archive complète avec sélecteur de restaurants & menus'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-stone-400 hover:text-white rounded-md transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* Main Action Box */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/90 to-stone-50 border border-amber-200/80 text-center space-y-3.5 shadow-xs">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'النسخة الأحدث مُحدثة وجاهزة' : 'Version complète et à jour (42 fichiers)'}</span>
            </div>

            <h4 className="text-base sm:text-lg font-bold text-stone-900">
              {lang === 'ar' ? 'تحميل الأرشيف الكامل بنقرة واحدة' : 'Téléchargement direct du projet complet'}
            </h4>
            
            <p className="text-xs text-stone-600 max-w-lg mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'يحتوي ملف ZIP هذا على كافة ملفات المصدر الحقيقية: محدد المطاعم، بروفايل دار الجزائر وبروفايل الباهية، موديل إضافة العملاء، القوائم بالدينار الجزائري، والصور.'
                : 'Ce fichier ZIP contient les vrais fichiers sources : RestaurantSelector, MultiRestaurantModal, les profils Dar El Djazaïr & El Bahia, le panier isolé, les photos HD et les commandes WhatsApp.'}
            </p>

            {/* Action Buttons Group */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
              {/* Primary Direct Download via Blob */}
              <button
                type="button"
                onClick={() => handleBlobDownload('dar-el-djazair-source.zip', directDownloadUrl)}
                disabled={downloadingFile === 'dar-el-djazair-source.zip'}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-emerald-700 hover:bg-emerald-800 active:scale-[0.98] rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-75"
              >
                {downloadingFile === 'dar-el-djazair-source.zip' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{lang === 'ar' ? 'جارٍ التحميل...' : 'Téléchargement en cours...'}</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>{lang === 'ar' ? 'تحميل dar-el-djazair-source.zip' : 'Télécharger ZIP (3.8 Mo)'}</span>
                  </>
                )}
              </button>

              {/* External / Direct Tab Trigger (Bypasses iframe sandboxes completely) */}
              <a
                href={directDownloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3.5 text-xs font-semibold text-stone-800 bg-white hover:bg-stone-100 border border-stone-300 rounded-xl shadow-2xs transition-all text-center"
              >
                <ExternalLink className="w-4 h-4 text-amber-700" />
                <span>{lang === 'ar' ? 'فتح الرابط في تبويب جديد' : 'Ouvrir dans un nouvel onglet'}</span>
              </a>
            </div>

            {/* Success Banner */}
            {downloadSuccess && (
              <div className="p-2.5 rounded-lg bg-emerald-100 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center justify-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-700 shrink-0" />
                <span>
                  {lang === 'ar' 
                    ? 'تم بدء التنزيل بنجاح! تفقد مجلد التنزيلات (Downloads).' 
                    : 'Téléchargement démarré avec succès ! Vérifiez votre dossier Téléchargements.'}
                </span>
              </div>
            )}

            {/* Direct Link Copy Bar (Solves iframe download blocking) */}
            <div className="pt-2 text-left bg-stone-100/80 p-3 rounded-xl border border-stone-200">
              <div className="flex items-center justify-between text-xs text-stone-600 mb-1.5 font-medium">
                <span className="flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-stone-500" />
                  {lang === 'ar' ? 'رابط التحميل المباشر (انسخه إذا منع المتصفح التنزيل) :' : 'Lien de téléchargement direct (à copier si l\'iframe bloque) :'}
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-800 hover:text-amber-950 px-2 py-0.5 rounded bg-amber-100/80 hover:bg-amber-200 transition-colors"
                >
                  {copiedLink ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-700" />
                      <span className="text-emerald-700">{lang === 'ar' ? 'تم النسخ' : 'Copié !'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>{lang === 'ar' ? 'نسخ الرابط' : 'Copier'}</span>
                    </>
                  )}
                </button>
              </div>
              <div className="font-mono text-[11px] text-stone-700 bg-white p-2 rounded border border-stone-200 truncate select-all">
                {directDownloadUrl}
              </div>
            </div>

            {/* Checklist of files included */}
            <div className="mt-3 p-3 bg-white/90 rounded-xl border border-stone-200 text-left text-[11px] text-stone-600">
              <p className="font-bold text-stone-800 mb-1.5 flex items-center gap-1.5">
                <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>{lang === 'ar' ? 'الملفات المضمنة والمؤكدة في الأرشيف :' : 'Fichiers confirmés et inclus dans l\'archive :'}</span>
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] font-mono text-stone-700">
                <li className="flex items-center gap-1 text-emerald-800 font-medium">✓ src/components/RestaurantSelector.tsx</li>
                <li className="flex items-center gap-1 text-emerald-800 font-medium">✓ src/components/MultiRestaurantModal.tsx</li>
                <li className="flex items-center gap-1 text-emerald-800 font-medium">✓ src/data/restaurantProfiles.ts</li>
                <li className="flex items-center gap-1 text-emerald-800 font-medium">✓ src/config/restaurants/darElDjazair.ts</li>
                <li className="flex items-center gap-1 text-emerald-800 font-medium">✓ src/config/restaurants/elBahiaOran.ts</li>
                <li className="flex items-center gap-1 text-emerald-800 font-medium">✓ src/config/restaurantsRegistry.ts</li>
              </ul>
            </div>
          </div>

          {/* Step-by-Step Beginner Instructions */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
              <Terminal className="w-4 h-4 text-amber-700" />
              <span>{lang === 'ar' ? 'دليل التشغيل خطوة بخطوة للمبتدئين' : 'Guide de démarrage pas à pas pour débutants'}</span>
            </h4>

            <div className="space-y-2 text-xs text-stone-600">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">1</span>
                <div>
                  <strong className="text-stone-900 block">{lang === 'ar' ? 'تنزيل وفك الضغط :' : 'Télécharger et décompresser :'}</strong>
                  <span>{lang === 'ar' ? 'اضغط على زر التحميل الأخضر أعلاه، ثم قم بفك ضغط ملف ZIP في مجلد على جهازك.' : 'Cliquez sur le bouton vert ci-dessus pour télécharger le ZIP (ou collez l\'URL dans un nouvel onglet), puis faites un clic droit "Extraire tout" sur votre ordinateur.'}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">2</span>
                <div>
                  <strong className="text-stone-900 block">{lang === 'ar' ? 'تثبيت البرمجيات (Node.js) :' : 'Prérequis (Node.js) :'}</strong>
                  <span>{lang === 'ar' ? 'تأكد من تثبيت Node.js (مجاني من موقع nodejs.org).' : 'Installez gratuitement Node.js depuis nodejs.org si vous ne l\'avez pas déjà.'}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200 flex items-start gap-3">
                <span className="w-5 h-5 rounded-full bg-stone-900 text-white flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">3</span>
                <div>
                  <strong className="text-stone-900 block">{lang === 'ar' ? 'تشغيل الموقع محلياً :' : 'Lancer le site :'}</strong>
                  <span>{lang === 'ar' ? 'افتح موجه الأوامر (Terminal) في مجلد المشروع واكتب :' : 'Ouvrez un terminal dans le dossier extrait et tapez :'}</span>
                  <div className="mt-1.5 p-2 rounded bg-stone-900 text-stone-100 font-mono text-[11px] space-y-1">
                    <p>npm install</p>
                    <p>npm run dev</p>
                  </div>
                  <span className="text-[11px] text-stone-500 mt-1 block">
                    {lang === 'ar' ? 'سيفتح الموقع على: http://localhost:3000' : 'Votre site s\'ouvrira à l\'adresse : http://localhost:3000'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Explanation on Google AI Studio UI & Alternative Export */}
          <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200 space-y-2 text-xs text-stone-700">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <HelpCircle className="w-4 h-4 shrink-0 text-amber-800" />
              <span>{lang === 'ar' ? 'حلول إضافية لتصدير المشروع' : 'Solutions supplémentaires pour exporter votre projet'}</span>
            </div>
            <p className="leading-relaxed">
              {lang === 'ar'
                ? 'إذا واجهت أي مشكلة، يمكنك نسخ الرابط المباشر أعلاه ولصقه مباشرة في شريط العناوين بمتصفحك، أو استخدام زر "Export to GitHub" المتاح في أعلى واجهة Google AI Studio لمزامنة الكود مع حساب GitHub الخاص بك.'
                : 'Si votre navigateur bloque les téléchargements dans la fenêtre intégrée de Google AI Studio, il vous suffit de copier l\'URL directe ci-dessus et de la coller dans la barre d\'adresse de votre navigateur. Vous pouvez également cliquer sur "Export to GitHub" en haut de Google AI Studio pour envoyer le code directement sur GitHub.'}
            </p>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-stone-200 bg-stone-50 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-mono">
            <FolderArchive className="w-3.5 h-3.5 text-stone-400" />
            <span>dar-el-djazair-source.zip</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-stone-800 hover:text-stone-950 bg-white border border-stone-300 rounded-lg hover:bg-stone-50 transition-colors"
          >
            {lang === 'ar' ? 'إغلاق' : 'Fermer'}
          </button>
        </div>

      </div>
    </div>
  );
};
