import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function RegisterFormInput({ id, name, label, type = 'text', value, onChange }) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-lg">{label}</Label>
            <Input
                id={id}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full bg-background text-foreground"
            />
        </div>
    );
}
