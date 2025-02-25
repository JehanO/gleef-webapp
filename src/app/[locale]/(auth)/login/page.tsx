"use client"

import { redirect } from 'next/navigation'
import { useState } from 'react'
import { useTranslation } from '@/hooks/useTranslation'
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import AuthLayout from "@/components/auth/layout"
import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
    const { t } = useTranslation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState<{email?: string; password?: string}>({})
    const [isLoading, setIsLoading] = useState(false)

    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})
        setIsLoading(true)

        // Validation basique
        if (!email) {
            setErrors(e => ({...e, email: t('auth.login.form.email.error.required')}))
        } else if (!validateEmail(email)) {
            console.log("erreur catched")
            setErrors(e => ({...e, email: t('auth.login.form.email.error.invalid')}))
        }

        if (!password) {
            setErrors(e => ({...e, password: t('auth.login.form.password.error.required')}))
        }

        if (!email || !password || !validateEmail(email)) {
            setIsLoading(false)
            return
        }

        try {
            const supabase = createClient()
            const { error } = await supabase.auth.signInWithPassword({ email, password })
            if (error) {
                setErrors({email: t('auth.login.form.password.error.invalid')})
            } else {
                console.log("Login successful")
                redirect('/')
            }
        } catch (error) {
            setErrors({email: t('auth.login.form.password.error.invalid')})
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthLayout>
        <div className="w-full space-y-6 bg-card p-8 rounded-lg border shadow-sm">
            <div className="space-y-2">
            <h1 className="text-2xl font-bold">{t('auth.login.title')}</h1>
            <p className="text-muted-foreground">{t('auth.login.subtitle')}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="w-full" disabled={isLoading}>
                <Icons.google className="mr-2 h-4 w-4" />
                {t('auth.login.social.google')}
            </Button>
            <Button variant="outline" className="w-full" disabled={isLoading}>
                <Icons.gitHub className="mr-2 h-4 w-4" />
                {t('auth.login.social.github')}
            </Button>
            </div>

            <div className="relative">
            <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">{t('auth.login.divider')}</span>
            </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
                <label className="text-sm font-medium">{t('auth.login.form.email.label')}</label>
                <Input
                type="email"
                placeholder={t('auth.login.form.email.placeholder')}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? "border-destructive" : ""}
                />
                {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
                )}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium">{t('auth.login.form.password.label')}</label>
                <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? "border-destructive" : ""}
                />
                {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
                )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" /> : 
                null
                }
                {t('auth.login.submit')}
            </Button>
            </form>

            <div className="text-center space-y-2">
            <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                {t('auth.login.forgotPassword')}
            </Link>
            <p className="text-sm text-muted-foreground">
                {t('auth.login.signUp.prompt')}{" "}
                <Link href="/auth/signup" className="text-primary hover:underline">
                {t('auth.login.signUp.link')}
                </Link>
            </p>
            </div>
        </div>
        </AuthLayout>
    )
}