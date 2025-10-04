import { useState, useEffect, useCallback } from 'react';

import image from './assets/marcsonia.jpg'
import './App.css'

// --- CONFIGURACIÓN DE LA BODA ---
const TARGET_DATE = '2026-10-03T11:30:00'; // ¡Asegúrate de cambiar esta fecha y hora!
const COUPLE_NAMES = 'Marc & Sonia';

const Icon = ({ name, className } : {name: any, className: any}) => {
    const icons: any = {
        // Icono de Calendario
        calendar: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>,
        // Icono de Ubicación/Iglesia
        church: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M10 22v-4c0-1.7 1.3-3 3-3s3 1.3 3 3v4"/><path d="M12 2c3.3 0 6 2.7 6 6v7h4v2h-4v3h-4v-3h-4v3H2v-3h-4v-2h4V8c0-3.3 2.7-6 6-6z"/></svg>,
        // Icono de Vestimenta/Dress Code
        shirt: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.3 3.6c-1.3-.9-3-.4-4 .6L12 9l-4-5.4c-1-.9-2.7-1.4-4-.6-2.5 1.7-2.3 5.4 0 7.2L12 22l12.3-11.2c2.3-1.8 2.5-5.5 0-7.2z"/></svg>,
    };
    return icons[name] || null;
};

const calculateTimeLeft = (target: string) => {
    const difference = +new Date(target) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            días: Math.floor(difference / (1000 * 60 * 60 * 24)),
            horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutos: Math.floor((difference / 1000 / 60) % 60),
            segundos: Math.floor((difference / 1000) % 60),
        };
    } else {
        timeLeft = { días: 0, horas: 0, minutos: 0, segundos: 0 };
    }
    return timeLeft;
};

// Componente para mostrar una unidad de tiempo (días, horas, etc.)
const TimeUnit = ({ value, label } : {value: any, label: string}) => (
    <div className="flex flex-col items-center bg-stone-50 p-4 sm:p-6 rounded-xl shadow-lg m-2 w-[85px] sm:w-[120px] transition duration-300 hover:shadow-2xl hover:scale-[1.02]">
        <div className="text-4xl sm:text-6xl font-extrabold text-teal-800 font-serif leading-none">
            {String(value).padStart(2, '0')}
        </div>
        <div className="text-xs sm:text-sm font-medium uppercase text-gray-600 mt-2 tracking-wider">
            {label}
        </div>
    </div>
);

function App() {
  // 1. Lógica de la Cuenta Regresiva
    const [timeLeft, setTimeLeft] = useState<any>(calculateTimeLeft(TARGET_DATE));

    // Función que se ejecuta cada segundo para actualizar el estado
    const updateCountdown = useCallback(() => {
        setTimeLeft(calculateTimeLeft(TARGET_DATE));
    }, []);

    useEffect(() => {
        // Establecer un intervalo para actualizar el contador cada 1000ms (1 segundo)
        const timer = setInterval(updateCountdown, 1000);
        // Función de limpieza para detener el intervalo cuando el componente se desmonte
        return () => clearInterval(timer);
    }, [updateCountdown]);

    // Generar los componentes de tiempo
    const timerComponents = Object.keys(timeLeft).map((interval) => (
        <TimeUnit key={interval} value={timeLeft[interval]} label={interval} />
    ));

    return (
        // Contenedor principal con fondo neutro
        <div className="min-h-screen bg-stone-100 flex flex-col font-sans">
            {/* Sección del Héroe (Fondo + Título) */}
            <div
                className="hero-section w-full h-[60vh] sm:h-[70vh] flex flex-col items-center justify-center p-4 shadow-xl"
                style={{
                    backgroundImage: `url('${image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                }}
            >
                {/* Overlay oscuro para mejorar la legibilidad del texto */}
                <div className="absolute inset-0 bg-black opacity-40"></div>
                
                {/* Contenido del Héroe */}
                <div className="relative text-center z-10 p-6 rounded-xl bg-opacity-10 backdrop-blur-sm shadow-2xl">
                    <h1 className="text-3xl sm:text-6xl font-serif font-bold text-white mb-2 leading-tight drop-shadow-lg">
                        {COUPLE_NAMES}
                    </h1>
                    <p className="text-lg sm:text-2xl text-teal-100 font-light italic drop-shadow-md">
                        Al final... ¡NOS CASAMOS!  ...por fin 
                    </p>
                </div>
            </div>

            {/* Sección de Cuenta Regresiva Flotante */}
            <div className="w-full -mt-20 sm:-mt-24 z-20 px-4">
                <div className="max-w-6xl mx-auto bg-white p-6 sm:p-10 rounded-2xl shadow-2xl">
                    <h2 className="text-center text-xl sm:text-2xl font-bold text-teal-800 mb-6 border-b pb-4 border-teal-100">
                        El amor tiene fecha: ¡prepárate para el gran día!
                    </h2>
                    <div className="flex justify-evenly flex-wrap">
                        {timerComponents.length ? timerComponents : <p className="text-gray-600 italic">¡La boda es hoy! ¡A disfrutar!</p>}
                    </div>
                </div>
            </div>
            
            {/* Sección de Detalles Clave */}
            <div className="w-full p-4 sm:p-10 mt-8">
                <div className="max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-teal-50">
                    <h2 className="text-center text-2xl font-bold text-teal-800 mb-6 border-b pb-4 border-teal-100">
                        Detalles Clave del Evento
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        
                        {/* 1. La Ceremonia */}
                        <div className="p-4 rounded-xl bg-teal-50 shadow-md">
                            <span className="text-4xl text-teal-600 mb-2 inline-block">📅​</span>
                            <h3 className="text-lg font-semibold text-gray-800">Fecha</h3>
                            <p className="text-sm text-gray-600">
                                Sábado, 3 de Octubre de 2026
                            </p>
                            <p className="text-sm text-teal-700 font-medium">
                                A las 11:30h
                            </p>
                        </div>
                        
                        {/* 2. El Banquete */}
                        <div className="p-4 rounded-xl bg-teal-50 shadow-md">
                            <span className="text-4xl text-teal-600 mb-2 inline-block">🏛️​</span>
                            <h3 className="text-lg font-semibold text-gray-800">Lugar</h3>
                            <p className="text-sm text-gray-600 mt-1">
                               Carrer Castell nº 1, Sant Martí de Tous
                            </p>
                            <p className="text-sm text-teal-700 font-medium">
                               Castell de tous
                                
                            </p>
                        </div>

                        {/* 3. Dress Code */}
                        <div className="p-4 rounded-xl bg-teal-50 shadow-md">
                            <span className="text-4xl text-teal-600 mb-2 inline-block">👗</span>
                            <h3 className="text-lg font-semibold text-gray-800">Vestimenta</h3>
                            <p className="text-sm text-gray-600 mt-1">
                                Formal Elegante
                            </p>
                            <p className="text-sm text-teal-700 font-medium">
                                ¡Vistete para la fiesta!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Pie de Página */}
            <footer className="mt-auto p-4 text-center text-sm text-gray-500">
                Diseñado con ❤️ por {COUPLE_NAMES}.
            </footer>
        </div>
    );
}

export default App
