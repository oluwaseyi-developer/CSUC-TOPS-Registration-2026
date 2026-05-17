import { cn } from '@/lib/utils';

interface ToggleProps {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function Toggle({ label, description, checked, onChange }: ToggleProps) {
  return (
    <label className="flex items-start gap-4 cursor-pointer group">
      <div className="relative mt-1">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={cn(
            'w-14 h-8 rounded-full transition-all duration-300',
            checked ? 'bg-gold-500' : 'bg-white/20'
          )}
        />
        <div
          className={cn(
            'absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-lg transition-transform duration-300',
            checked && 'translate-x-6'
          )}
        />
      </div>
      <div className="flex-1">
        {label && (
          <span className="block text-white font-medium group-hover:text-gold-300 transition-colors">
            {label}
          </span>
        )}
        {description && (
          <span className="block text-sm text-white/60 mt-0.5">{description}</span>
        )}
      </div>
    </label>
  );
}
