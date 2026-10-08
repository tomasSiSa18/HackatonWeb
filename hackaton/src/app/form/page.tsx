"use client"

import { Button } from "@/components/ui/button"
import { InputGroup, InputGroupInput } from "@/components/ui/input-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useReducer, useState } from "react"

type State = {
    username: string
    fullName: string
    age: string
    errors: Record<string, string>
}

type Action =
    | { type: "SET_FIELD"; field: keyof State; value: string }
    | { type: "SET_ERROR"; field: string; error: string }

const initialState: State = { username: "", fullName: "", age: "", errors: {} }

function formReducer(state: State, action: Action): State {
    switch (action.type) {
        case "SET_FIELD":
            return { ...state, [action.field]: action.value }
        case "SET_ERROR":
            return {
                ...state,
                errors: { ...state.errors, [action.field]: action.error },
            }
        default:
            return state
    }
}

function validate(field: string, value: string): string {
    switch (field) {
        case "nombre":
            if (!value) return "El nombre es obligatorio"
            return ""
        case "username":
            if (!value) return "El usuario es obligatorio"
            if (!/^[a-zA-Z0-9]+$/.test(value))
                return "El usuario debe ser alfanúmerico"
            if (value.length > 20)
                return "El usuario no puede tener mas de 20 caracteres"
            return ""

        case "age":
            if (!value) return "La edad es obligatoria"
            if (isNaN(Number(value))) return "La edad debe ser un número"
            if (Number(value) > 100) return "La edad debe ser menor a 100"
        default:
            return ""
    }
}

export default function CreatePlanPage() {
    const router = useRouter()

    const [state, dispatch] = useReducer(formReducer, initialState)
    const [error, setError] = useState<string | null>(null)
    const [sent, setSent] = useState(false)
    const [loading, setLoading] = useState(false)

    const hasErrorsOrEmpty = (["username", "fullName", "age"] as const).some(
        (f) => validate(f, state[f]) !== "",
    )

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        const { name, value } = e.target
        const error = validate(name, value)
        dispatch({ type: "SET_ERROR", field: name, error })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({
            type: "SET_FIELD",
            field: e.target.name as keyof State,
            value: e.target.value,
        })
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setError(null)
        setLoading(true)

        setTimeout(() => {})

        setLoading(false)
        setSent(true)
    }

    return (
        <div className="flex gap-6">
            <form
                className="border-border bg-card flex flex-col gap-6 rounded-3xl border p-8"
                onSubmit={handleSubmit}
            >
                <div className="border-border items-center gap-6 border-b pb-6">
                    <Label
                        htmlFor="username"
                        className="block text-sm font-semibold text-slate-700"
                    >
                        Usuario
                    </Label>
                    <InputGroup>
                        <InputGroupInput
                            id="username"
                            type="text"
                            name="username"
                            placeholder="Nombre de usuario"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                            value={state.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></InputGroupInput>
                    </InputGroup>

                    {state.errors.username && (
                        <p className="text-sm text-red-600 mt-1">
                            {state.errors.username}
                        </p>
                    )}

                    <Label
                        htmlFor="fullName"
                        className="block text-sm font-semibold text-slate-700"
                    >
                        Nombre completo
                    </Label>
                    <InputGroup>
                        <InputGroupInput
                            id="fullName"
                            type="text"
                            name="fullName"
                            placeholder="Nombre de usuario"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                            value={state.fullName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></InputGroupInput>
                    </InputGroup>

                    {state.errors.fullName && (
                        <p className="text-sm text-red-600 mt-1">
                            {state.errors.fullName}
                        </p>
                    )}

                    <Label
                        htmlFor="age"
                        className="block text-sm font-semibold text-slate-700"
                    >
                        Edad
                    </Label>
                    <InputGroup>
                        <InputGroupInput
                            id="age"
                            type="number"
                            name="age"
                            placeholder="Nombre de usuario"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mt-1 outline-none"
                            value={state.age}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        ></InputGroupInput>
                    </InputGroup>

                    {state.errors.age && (
                        <p className="text-sm text-red-600 mt-1">
                            {state.errors.age}
                        </p>
                    )}

                    <Button
                        type="submit"
                        disabled={hasErrorsOrEmpty || loading}
                    >
                        Mandar
                    </Button>
                </div>
            </form>

            {sent && (
                <div className="flex flex-col gap-6">
                    <p>Usuario: {state.username}</p>
                    <p>Nombre completo: {state.fullName}</p>
                    <p>Edad: {state.age}</p>
                </div>
            )}
        </div>
    )
}
