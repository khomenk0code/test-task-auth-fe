import { Button } from '@/components/ui/button';

export default function ProfileField({ label, value, onEdit }) {
    return (
        <div className="space-y-3">
            <p>{label}: {value}</p>
            <Button onClick={onEdit} className="w-full">
                Change {label}
            </Button>
        </div>
    );
}
