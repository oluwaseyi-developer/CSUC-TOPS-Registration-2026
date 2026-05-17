import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { CheckCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

import { Input, Textarea, RadioGroup, Toggle, Button } from '@/components/ui';
import { useFormOptions } from '@/hooks/useFormOptions';
import { registrationApi } from '@/api';
import type { RegistrationRequest } from '@/types';

const nigerianPhoneRegex = /^(\+234|234|0)?[789][01]\d{8}$/;

const registrationSchema = z.object({
  fullName: z.string()
    .min(2, 'Full name must be at least 2 characters')
    .max(200, 'Full name must not exceed 200 characters')
    .regex(/^[a-zA-Z\s\-'.]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
  sex: z.number().min(1, 'Please select your gender'),
  email: z.string()
    .email('Please enter a valid email address')
    .max(256, 'Email must not exceed 256 characters'),
  phoneNumber: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must not exceed 15 digits')
    .regex(nigerianPhoneRegex, 'Please enter a valid Nigerian phone number (e.g., 08012345678 or +2348012345678)'),
  locationState: z.string()
    .min(2, 'Please enter your location/state')
    .max(100, 'Location/State must not exceed 100 characters'),
  expectations: z.string()
    .max(2000, 'Expectations must not exceed 2000 characters')
    .optional()
    .or(z.literal('')),
  needsAccommodation: z.boolean(),
  meansOfTransportation: z.number().min(1, 'Please select means of transportation'),
  comingWith: z.number().min(1, 'Please select who you are coming with'),
  numberOfPersons: z.number().min(0).max(50, 'Number of persons must not exceed 50'),
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

export function RegistrationForm() {
  const [isSuccess, setIsSuccess] = useState(false);
  const { data: formOptions, isLoading: optionsLoading } = useFormOptions();

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: '',
      sex: 0,
      email: '',
      phoneNumber: '',
      locationState: '',
      expectations: '',
      needsAccommodation: false,
      meansOfTransportation: 0,
      comingWith: 0,
      numberOfPersons: 0,
    },
  });

  const comingWith = watch('comingWith');

  const mutation = useMutation({
    mutationFn: (data: RegistrationRequest) => registrationApi.register(data),
    onSuccess: () => {
      setIsSuccess(true);
      toast.success('Registration successful!');
    },
    onError: (error: any) => {
      // Try to get the error message from the API response
      const apiMessage = error.response?.data?.message;
      const errorMessage = apiMessage || error.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
    },
  });

  const onSubmit = (data: RegistrationFormData) => {
    mutation.mutate(data);
  };

  if (isSuccess) {
    return <SuccessMessage />;
  }

  if (optionsLoading) {
    return <FormSkeleton />;
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8"
    >
      {/* Personal Information */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gold-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name *"
            placeholder="Enter your full name"
            error={errors.fullName?.message}
            {...register('fullName')}
          />

          <Input
            label="Email Address *"
            type="email"
            placeholder="your.email@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Phone Number *"
            type="tel"
            placeholder="+234 800 000 0000"
            error={errors.phoneNumber?.message}
            {...register('phoneNumber')}
          />

          <Input
            label="Location / State *"
            placeholder="e.g., Lagos, Nigeria"
            error={errors.locationState?.message}
            {...register('locationState')}
          />
        </div>

        <Controller
          name="sex"
          control={control}
          render={({ field }) => (
            <RadioGroup
              label="Gender *"
              name="sex"
              options={formOptions?.gender || []}
              value={field.value}
              onChange={field.onChange}
              error={errors.sex?.message}
            />
          )}
        />
      </section>

      {/* Expectations */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gold-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Your Expectations
        </h3>

        <Textarea
          label="What are your expectations for this Anniversary & Covenant Service?"
          placeholder="Share your expectations, prayer points, and what you hope to receive at this glorious event... (Optional)"
          error={errors.expectations?.message}
          {...register('expectations')}
        />
      </section>

      {/* Logistics */}
      <section className="space-y-6">
        <h3 className="text-xl font-semibold text-gold-400 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          Logistics
        </h3>

        <Controller
          name="needsAccommodation"
          control={control}
          render={({ field }) => (
            <Toggle
              label="Will you need accommodation?"
              description="Let us know if you'll need a place to stay during the event"
              checked={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          name="meansOfTransportation"
          control={control}
          render={({ field }) => (
            <RadioGroup
              label="Means of Transportation *"
              name="meansOfTransportation"
              options={formOptions?.transportation || []}
              value={field.value}
              onChange={field.onChange}
              error={errors.meansOfTransportation?.message}
            />
          )}
        />

        <Controller
          name="comingWith"
          control={control}
          render={({ field }) => (
            <RadioGroup
              label="Will you be coming alone or with brethren/family? *"
              name="comingWith"
              options={formOptions?.comingWith || []}
              value={field.value}
              onChange={field.onChange}
              error={errors.comingWith?.message}
            />
          )}
        />

        {comingWith > 1 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              type="number"
              label="Number of persons coming with you"
              placeholder="Enter number"
              min={1}
              max={50}
              error={errors.numberOfPersons?.message}
              {...register('numberOfPersons', { valueAsNumber: true })}
            />
          </motion.div>
        )}
      </section>

      {/* Submit Button */}
      <div className="pt-4">
        <Button
          type="submit"
          size="lg"
          loading={mutation.isPending}
          className="w-full md:w-auto"
        >
          {mutation.isPending ? 'Submitting Registration...' : 'Complete Registration'}
        </Button>
        {mutation.isPending && (
          <p className="text-white/60 text-sm mt-2 text-center md:text-left">
            Please wait, this may take a moment...
          </p>
        )}
      </div>
    </motion.form>
  );
}

function SuccessMessage() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-8 space-y-6"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative"
      >
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4 }}
          className="absolute -top-2 -right-2 w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center"
        >
          <Sparkles className="w-4 h-4 text-primary-900" />
        </motion.div>
      </motion.div>

      <div className="space-y-4">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-gradient">
          🎉 Hallelujah! You're Registered!
        </h2>

        <div className="bg-gold-500/10 border border-gold-400/20 rounded-xl p-4 max-w-md mx-auto">
          <p className="text-white/90 leading-relaxed">
            Glory to God! Your registration for the <span className="text-gold-400 font-semibold">TOPS CHAPTER Anniversary & Covenant Service 2026</span> has been confirmed.
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 max-w-md mx-auto space-y-3">
          <p className="text-gold-400 font-semibold text-sm">📅 Mark Your Calendar</p>
          <div className="text-white/80 text-sm space-y-1">
            <p><span className="text-white font-medium">Anniversary Program:</span> June 17 - 21, 2026</p>
            <p><span className="text-white font-medium">Covenant Service:</span> June 20, 2026</p>
            <p><span className="text-white font-medium">Venue:</span> Behind Apeeki Palace, Otun Area, Saki</p>
          </div>
        </div>
      </div>

      <div className="pt-4 space-y-3">
        <Button
          variant="secondary"
          onClick={() => window.location.reload()}
        >
          Register Another Person
        </Button>
        <p className="text-white/40 text-xs">
          Share this event with your brethren and friends!
        </p>
      </div>
    </motion.div>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="space-y-4">
          <div className="h-6 w-48 bg-white/10 rounded" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-12 bg-white/10 rounded-xl" />
            <div className="h-12 bg-white/10 rounded-xl" />
          </div>
        </div>
      ))}
    </div>
  );
}
