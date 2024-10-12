import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ProfileEditField({ label, name, value, onChange, onSave, onCancel, loading }) {
    return (
        <div className="space-y-3">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <Input name={name} value={value} onChange={onChange} />

            <div className="flex justify-end space-x-4 mt-4">
                <Button variant="danger" onClick={onCancel} className="bg-red-500">
                    Cancel
                </Button>
                <Button onClick={onSave} disabled={loading}>
                    {loading ? 'Saving...' : `Save ${label}`}
                </Button>
            </div>
        </div>
    );
}
