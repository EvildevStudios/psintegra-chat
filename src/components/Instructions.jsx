import React from "react";

const Instructions = () => {
    return (
        <div className="instructions">
            <div className="instructions__header">
                <h2>Bienvenido a Libre Consejo</h2>
                <button className="close-button">Cerrar</button>
            </div>
            <div className="instructions__content">
                <p>Tu asistente virtual psicológico.</p>
                <ul>
                    <li>Paso 1: Regístrate para acceder a todas las funciones.</li>
                    <li>Paso 2: Explora las categorías de consejos disponibles.</li>
                    <li>Paso 3: Haz clic en un consejo para recibir orientación.</li>
                    <li>Paso 4: Utiliza el chat para interactuar con el asistente.</li>
                    <li>Paso 5: No dudes en contactarnos si necesitas ayuda adicional.</li>
                </ul>
            </div>
        </div>
    );
};

export default Instructions;
