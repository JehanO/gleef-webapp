"use client"

import { useState, useEffect } from "react"
import { Icons } from "@/components/ui/icons"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import AuthLayout from "@/components/auth/layout"
import { isValidEmail, isCompanyEmail } from '@/lib/email-validation'
import { useTranslation } from '@/hooks/useTranslation'
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function SignUpPage() {
    const { t } = useTranslation()
    const router = useRouter()
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
        general?: string
    }>({})
    const [isLoading, setIsLoading] = useState(false)
    const [checkingSession, setCheckingSession] = useState(true)

    const supabase = createClientComponentClient()
    
    // Check if user is already logged in
    useEffect(() => {
        const checkSession = async () => {
            const { data } = await supabase.auth.getSession()
            if (data.session) {
                router.push('/')
            } else {
                setCheckingSession(false)
            }
        }
        
        checkSession()
    }, [router, supabase])

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    const checkCompanyEmail = async (email: string): Promise<boolean> => {
        // This is a simple client-side implementation
        // In production, you might want to check this server-side
        return isCompanyEmail(email)
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
            } else if (!validateEmail(formData.email)) {
                newErrors.email = t('auth.signup.credentials.email.error.invalid')
            } else {
                const isCompany = await checkCompanyEmail(formData.email)
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
                setIsLoading(false)
                return
            }

            // Create user with Supabase
            const { data, error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        firstname: formData.firstname
                    }
                }
            })

            if (error) throw error

            // Redirect to confirmation page or login
            router.push('/login')
            
        } catch (error) {
            console.error("Registration error:", error)
            setErrors({ 
                general: t('auth.signup.credentials.submit.error.error')
            })
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignUp = async () => {
        setIsLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/callback`
                }
            })
            if (error) throw error
        } catch (error) {
            console.error("Google signup error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGithubSignUp = async () => {
        setIsLoading(true)
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'github',
                options: {
                    redirectTo: `${window.location.origin}/callback`
                }
            })
            if (error) throw error
        } catch (error) {
            console.error("GitHub signup error:", error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    if (checkingSession) {
        return (
            <AuthLayout>
                <div className="flex justify-center items-center min-h-[300px]">
                    <Icons.spinner className="h-8 w-8 animate-spin" />
                </div>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout>
        <div className="w-full space-y-6 bg-card p-8 rounded-lg border shadow-sm">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">{t('auth.signup.title')}</h1>
                <p className="text-muted-foreground">{t('auth.signup.social.title')}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
                <Button 
                    variant="outline" 
                    className="w-full" 
                    disabled={isLoading}
                    onClick={handleGoogleSignUp}
                >
                    <Icons.google className="mr-2 h-4 w-4" />
                    {t('auth.signup.social.google')}
                </Button>
                <Button 
                    variant="outline" 
                    className="w-full" 
                    disabled={isLoading}
                    onClick={handleGithubSignUp}
                >
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

            {errors.general && (
                <div className="bg-destructive/10 p-3 rounded-md">
                    <p className="text-sm text-destructive">{errors.general}</p>
                </div>
            )}

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
            <Link href="/login" className="text-primary hover:underline">
            {t('auth.signup.credentials.submit.signIn')}
            </Link>
            </p>
        </div>
        </AuthLayout>
    )
}