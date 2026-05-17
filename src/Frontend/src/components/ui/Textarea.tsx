import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="label-text">{label}</label>
        )}
        <textarea
          className={cn(
            'input-field min-h-[120px] resize-none',
            error && 'border-red-400',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="error-text">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
