'use client'

import InputFieldError from '@/components/shared/InputFieldError';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { registerUser } from '@/service/auth/registerUser';
import Link from 'next/link';
import React, { useActionState, useState } from 'react';

const RegisterForm = () => {
    const [state, formAction, isPending] = useActionState(registerUser, null);
    const [userRole, setUserRole] = useState<"TRAVELER" | "GUIDE">("TRAVELER")


    return (
        <form action={formAction} >
            <FieldGroup>
                <div className="grid grid-cols-2 gap-4">

                    {/* Name */}
                    <Field>
                        <FieldLabel htmlFor="name">Full Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                        />
                        <InputFieldError field="name" state={state} />
                    </Field>

                    {/* Email */}
                    <Field>
                        <FieldLabel htmlFor="email">Email</FieldLabel>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                        />
                        <InputFieldError field="email" state={state} />
                    </Field>

                    {/* Phone */}
                    <Field>
                        <FieldLabel htmlFor="phone">Phone</FieldLabel>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 555-123-4567"
                        />
                        <InputFieldError field="phone" state={state} />
                    </Field>

                    {/* Password */}
                    <Field>
                        <FieldLabel htmlFor="password">Password</FieldLabel>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            placeholder="Enter your password"
                        />
                        <InputFieldError field="password" state={state} />
                    </Field>

                    {/* Role */}
                    <Field>
                        <FieldLabel htmlFor="role">Role</FieldLabel>
                        <Input
                            id="userRole"
                            name="role"
                            placeholder="Select Role"
                            defaultValue={userRole}
                            type="hidden"
                        />
                        <Select
                            value={userRole}
                            onValueChange={(value) => setUserRole(value as "TRAVELER" | "GUIDE")}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Traveler</SelectLabel>
                                    <SelectItem value="TRAVELER">Traveler</SelectItem>
                                    <SelectItem value="GUIDE">Guide</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <InputFieldError field="role" state={state} />
                    </Field>

                    {/* Profile Photo */}
                    <Field>
                        <FieldLabel htmlFor="profilePhoto">Profile Photo</FieldLabel>
                        <Input
                            id="profilePhoto"
                            name="profilePhoto"
                            type="file"
                            accept="image/*"
                        />
                        <InputFieldError field="profilePhoto" state={state} />
                    </Field>

                    {/* Bio */}
                    <Field>
                        <FieldLabel htmlFor="bio">Bio</FieldLabel>
                        <textarea
                            id="bio"
                            name="bio"
                            rows={2}
                            className="w-full border rounded px-3 py-2"
                            placeholder="Tell us about yourself..."
                        />
                        <InputFieldError field="bio" state={state} />
                    </Field>

                    {/* Languages */}
                    <Field>
                        <FieldLabel>Languages</FieldLabel>

                        <FieldDescription className='text-xs'>
                            Add multiple languages (comma separated)
                        </FieldDescription>

                        <Input
                            id="language"
                            name="language"
                            type="text"
                            placeholder="English, Spanish, French"
                        />
                        <InputFieldError field="language" state={state} />
                    </Field>
                </div>

                <FieldGroup>
                    <Field>
                        <Button type="submit" disabled={isPending}>
                            {isPending ? "Registering..." : "Register"}
                        </Button>

                        <FieldDescription className="px-6 text-center">
                            Already have an account?{" "}
                            <Link href="/login" className="hover:underline">
                                Login
                            </Link>
                        </FieldDescription>
                    </Field>
                </FieldGroup>
            </FieldGroup>
        </form>
    );
};

export default RegisterForm;