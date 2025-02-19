"use client"

import { useState } from "react"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AuthLayout from "@/components/auth/layout"
import { isValidEmail, isCompanyEmail } from '@/lib/email-validation'
import { useTranslation } from '@/hooks/useTranslation'

export default function SignUpPage() {
    const { t } = useTranslation()
    const [formData, setFormData] = useState({
        firstname: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const [errors, setErrors] = useState<{
        firstname?: string
        email?: string
        password?: string
        confirmPassword?: string
    }>({})
    const [isLoading, setIsLoading] = useState(false)

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setIsLoading(true)

    try {
        // Validation
        const newErrors: typeof errors = {}
        if (!formData.firstname) newErrors.firstname = t('auth.signup.credentials.firstname.error.required')
        
        if (!formData.email) {
            newErrors.email = t('auth.signup.credentials.email.error.required')
        } else if (!isValidEmail(formData.email)) {
            newErrors.email = t('auth.signup.credentials.email.error.invalid')
        } else {
            const isCompany = await isCompanyEmail(formData.email)
        if (!isCompany) {
            newErrors.email = t('auth.signup.credentials.email.error.company')
        }
        }

        if (!formData.password) {
            newErrors.password = t('auth.signup.credentials.password.error.required')
        } else if (formData.password.length < 8) {
            newErrors.password = t('auth.signup.credentials.password.error.length')
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = t('auth.signup.credentials.confirmPassword.error')
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors)
            return
        }

        // TODO: Supabase auth
        console.log("Sign up:", formData)
    } catch (error) {
        setErrors({ email: t('auth.signup.credentials.submit.error.error') })
    } finally {
        setIsLoading(false)
    }
    }


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    return (
        <AuthLayout>
        <div className="w-full space-y-6 bg-card p-8 rounded-lg border shadow-sm">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">{t('auth.signup.title')}</h1>
                <p className="text-muted-foreground">{t('auth.signup.social.title')}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full" disabled={isLoading}>
                    <Icons.google className="mr-2 h-4 w-4" />
                    {t('auth.signup.social.google')}
                </Button>
                <Button variant="outline" className="w-full" disabled={isLoading}>
                    <Icons.gitHub className="mr-2 h-4 w-4" />
                    {t('auth.signup.social.github')}
                </Button>
            </div>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">{t('auth.signup.credentials.title')}</span>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">{t('auth.signup.credentials.firstname.label')}</label>
                <Input
                    name="firstname"
                    placeholder={t('auth.signup.credentials.firstname.placeholder')}
                    value={formData.firstname}
                    onChange={handleChange}
                    className={errors.firstname ? "border-destructive" : ""}
                    />
                {errors.firstname && (
                    <p className="text-sm text-destructive">{errors.firstname}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">{t('auth.signup.credentials.email.label')}</label>
                <Input
                    name="email"
                    type="email"
                    placeholder={t('auth.signup.credentials.email.placeholder')}
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">{t('auth.signup.credentials.password.label')}</label>
                <Input
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">{t('auth.signup.credentials.confirmPassword.label')}</label>
                <Input
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : 
                null
                }
                {t('auth.signup.credentials.submit.button')}
            </Button>
            </form>

            <p className="text-sm text-center text-muted-foreground">
            {t('auth.signup.credentials.submit.alreadyHaveAccount')}{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
            {t('auth.signup.credentials.submit.signIn')}
            </Link>
            </p>
        </div>
        </AuthLayout>
    )
}