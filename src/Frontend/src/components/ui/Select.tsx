import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { OptionItem } from '@/types';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: OptionItem[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder = 'Select an option', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="label-text">{label}</label>
        )}
        <select
          className={cn('select-field', error && 'border-red-400', className)}
          ref={ref}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && <p className="error-text">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';

export { Select };
