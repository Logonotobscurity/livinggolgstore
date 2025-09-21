
'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Icons } from '@/components/icons';
import { cn } from '@/lib/utils';
import { UseFormReturn } from 'react-hook-form';

interface FormFieldData {
  name: string;
  label: string;
  type: string;
}

interface NeumorphicFormProps {
  form: UseFormReturn<any>;
  onSubmit: (values: any) => void;
  fields: FormFieldData[];
  title: string;
  buttonText: string;
  isPending: boolean;
}

export function NeumorphicForm({
  form,
  onSubmit,
  fields,
  title,
  buttonText,
  isPending,
}: NeumorphicFormProps) {
  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className={cn('neumorphic-card w-full')}>
            <a className="neumorphic-title text-center">{title}</a>
            {fields.map(fieldData => (
              <FormField
                key={fieldData.name}
                control={form.control}
                name={fieldData.name}
                render={({ field }) => (
                  <FormItem className="neumorphic-input-box">
                    <FormControl>
                      <input
                        type={fieldData.type}
                        {...field}
                        required
                        id={`form-${fieldData.name}`}
                      />
                    </FormControl>
                    <FormLabel htmlFor={`form-${fieldData.name}`}>
                      {fieldData.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            ))}
            <button
              type="submit"
              disabled={isPending}
              className="neumorphic-button"
            >
              {isPending ? (
                <Icons.loader className="h-4 w-4 animate-spin mx-auto" />
              ) : (
                buttonText
              )}
            </button>
          </div>
        </form>
      </Form>
    </div>
  );
}
