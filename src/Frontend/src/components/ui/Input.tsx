import { forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="label-text">{label}</label>
        )}
        <input
          type={type}
          className={cn('input-field', error && 'border-red-400', className)}
          ref={ref}
          {...props}
        />
        {error && <p className="error-text">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
