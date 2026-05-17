import { cn } from '@/lib/utils';
import type { OptionItem } from '@/types';

interface RadioGroupProps {
  label?: string;
  error?: string;
  options: OptionItem[];
  value?: number;
  onChange: (value: number) => void;
  name: string;
}

export function RadioGroup({ label, error, options, value, onChange, name }: RadioGroupProps) {
  return (
    <div className="w-full">
      {label && <label className="label-text">{label}</label>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={cn(
              'radio-option',
              value === option.value && 'selected'
            )}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="sr-only"
            />
            <span
              className={cn(
                'w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all',
                value === option.value
                  ? 'border-gold-400 bg-gold-400'
                  : 'border-white/40'
              )}
            >
              {value === option.value && (
                <span className="w-2 h-2 rounded-full bg-primary-900" />
              )}
            </span>
            <span className="text-white/90">{option.label}</span>
          </label>
        ))}
      </div>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
}
