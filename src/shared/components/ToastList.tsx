import { useTranslation } from 'react-i18next';
import { useToasts } from '../services/toasts';

export function ToastList() {
  const { t } = useTranslation();
  const toasts = useToasts((state) => state.toasts);
  const dismiss = useToasts((state) => state.dismiss);
  return (
    <section aria-label={t('toasts.label')}>
      {toasts.map((toast) => (
        <div key={toast.id} role="alert">
          <p>{t(toast.message)}</p>
          {toast.requestId === undefined ? null : (
            <p>{t('errors.requestId', { requestId: toast.requestId })}</p>
          )}
          <button type="button" onClick={() => dismiss(toast.id)}>
            {t('toasts.close')}
          </button>
        </div>
      ))}
    </section>
  );
}
