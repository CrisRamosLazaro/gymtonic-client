import { useContext, useState } from "react"
import { ThemeContext } from '../../contexts/theme.context'

import '../Checkbox/Checkbox.css'

const Checkbox = ({ label, checked, onChange }) => {

    const { theme, switchTheme } = useContext(ThemeContext)
    const variant = theme === 'light' ? 'dark' : 'light'

    return (
        <div className={variant === 'light' ? 'checkbox-wrapper-light' : 'checkbox-wrapper-dark'}>
            <label>

                <input
                    type='checkbox'
                    checked={checked}
                    onChange={onChange}
                />

                <span>{label}</span>

            </label>
        </div>
    )
}
export default Checkbox
