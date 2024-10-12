import ProfileEditField from "@/app/(components)/profile/profile-edit-field"
import ProfileField from "@/app/(components)/profile/profile-field"
import {Button} from "@/components/ui/button"

export function ProfileFormFields({
                                      editField,
                                      setEditField,
                                      profileData,
                                      handleChange,
                                      handleUpdate,
                                      handleCancel,
                                      handlePasswordChange,
                                      loading,
                                  }) {
    return (
        <>
            <div className="min-h-[8rem]">
                {editField === 'username' ? (
                    <ProfileEditField
                        label="Username"
                        name="username"
                        value={profileData.username}
                        onChange={handleChange}
                        onSave={handleUpdate}
                        onCancel={handleCancel}
                        loading={loading}
                    />
                ) : (
                    <ProfileField
                        label="Username"
                        value={profileData.username}
                        onEdit={() => setEditField('username')}
                    />
                )}
            </div>

            <div className="min-h-[8rem]">
                {editField === 'email' ? (
                    <ProfileEditField
                        label="Email"
                        name="email"
                        value={profileData.email}
                        onChange={handleChange}
                        onSave={handleUpdate}
                        onCancel={handleCancel}
                        loading={loading}
                    />
                ) : (
                    <ProfileField
                        label="Email"
                        value={profileData.email}
                        onEdit={() => setEditField('email')}
                    />
                )}
            </div>

            <div className="min-h-[8rem]">
                {editField === 'password' ? (
                    <ProfileEditField
                        label="Password"
                        name="password"
                        value={profileData.password}
                        onChange={handleChange}
                        onSave={handlePasswordChange}
                        onCancel={handleCancel}
                        loading={loading}
                    />
                ) : (
                    <Button onClick={() => setEditField('password')} className="w-full">
                        Change Password
                    </Button>
                )}
            </div>
        </>
    );
}
