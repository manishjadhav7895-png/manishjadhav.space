import React from 'react';

interface PortraitVisualProps {
  customPhotoUrl?: string;
  scale?: number;
  yOffset?: number;
  rimLightIntensity?: number;
}

export const PortraitVisual: React.FC<PortraitVisualProps> = ({
  customPhotoUrl,
  scale = 100,
  yOffset = 0,
  rimLightIntensity = 85,
}) => {
  const scaleMultiplier = scale / 100;

  if (customPhotoUrl) {
    return (
      <div 
        className="relative w-full h-full flex items-end justify-center pointer-events-none select-none overflow-hidden"
        style={{
          transform: `translateY(${yOffset}px) scale(${scaleMultiplier})`,
          transformOrigin: 'bottom center',
        }}
      >
        <img
          src={customPhotoUrl}
          alt="Manish Jadhav"
          className="max-h-[92%] object-contain object-bottom relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
        />

        {/* Dynamic Red Rim Light Effects matching reference */}
        <div 
          className="absolute inset-0 pointer-events-none z-20 mix-blend-screen"
          style={{
            opacity: rimLightIntensity / 100,
            background: 'radial-gradient(circle at 20% 70%, rgba(220, 38, 38, 0.45) 0%, transparent 45%), radial-gradient(circle at 80% 70%, rgba(220, 38, 38, 0.45) 0%, transparent 45%)'
          }}
        />
      </div>
    );
  }

  // High-fidelity detailed vector illustration of Manish Jadhav matching the reference photo
  return (
    <div 
      className="relative w-full h-full flex items-end justify-center pointer-events-none select-none"
      style={{
        transform: `translateY(${yOffset}px) scale(${scaleMultiplier})`,
        transformOrigin: 'bottom center',
      }}
    >
      <svg
        viewBox="0 0 680 820"
        className="w-full max-w-[660px] h-[95%] max-h-[790px] drop-shadow-[0_25px_50px_rgba(0,0,0,0.95)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Skin Tones Gradients */}
          <linearGradient id="faceGrad" x1="280" y1="200" x2="390" y2="480" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#C99476" />
            <stop offset="45%" stopColor="#BA8366" />
            <stop offset="85%" stopColor="#8A5A44" />
            <stop offset="100%" stopColor="#673F2E" />
          </linearGradient>

          <linearGradient id="neckGrad" x1="340" y1="440" x2="340" y2="560" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#875841" />
            <stop offset="100%" stopColor="#4A2B1D" />
          </linearGradient>

          {/* Suit Jacket Gradients */}
          <linearGradient id="suitGrad" x1="140" y1="520" x2="540" y2="820" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1C1B1E" />
            <stop offset="50%" stopColor="#121113" />
            <stop offset="100%" stopColor="#0B0A0C" />
          </linearGradient>

          <linearGradient id="shirtGrad" x1="340" y1="520" x2="340" y2="680" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E1E22" />
            <stop offset="100%" stopColor="#0D0D10" />
          </linearGradient>

          {/* Red Rim Light Gradients */}
          <linearGradient id="leftRimRed" x1="120" y1="460" x2="260" y2="750" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF2A2A" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#D91616" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#800000" stopOpacity="0" />
          </linearGradient>

          <linearGradient id="rightRimRed" x1="560" y1="460" x2="420" y2="750" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FF2A2A" stopOpacity="0.8" />
            <stop offset="40%" stopColor="#D91616" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#800000" stopOpacity="0" />
          </linearGradient>

          <radialGradient id="hairGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#2A1B1A" />
            <stop offset="70%" stopColor="#151214" />
            <stop offset="100%" stopColor="#0C0A0B" />
          </radialGradient>

          {/* Glasses Lens Reflection */}
          <linearGradient id="lensReflect" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="45%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Body Base / Torso & Suit Jacket */}
        <g id="suit-body">
          {/* Main Suit Shape */}
          <path
            d="M 120 820 C 120 720 150 620 205 570 C 235 540 270 530 310 528 L 370 528 C 410 530 445 540 475 570 C 530 620 560 720 560 820 Z"
            fill="url(#suitGrad)"
          />

          {/* Shoulders Left and Right Silhouette */}
          <path
            d="M 110 820 Q 135 630 240 550 L 290 535 L 290 820 Z"
            fill="#151417"
          />
          <path
            d="M 570 820 Q 545 630 440 550 L 390 535 L 390 820 Z"
            fill="#151417"
          />

          {/* Dark Shirt Inside */}
          <path
            d="M 300 530 L 380 530 L 385 680 L 340 760 L 295 680 Z"
            fill="url(#shirtGrad)"
          />

          {/* Shirt Collar V-Open */}
          <path
            d="M 310 530 L 340 610 L 325 615 L 302 540 Z"
            fill="#2A2A30"
          />
          <path
            d="M 370 530 L 340 610 L 355 615 L 378 540 Z"
            fill="#2A2A30"
          />
          {/* Inner chest neck shadow */}
          <path
            d="M 326 530 Q 340 580 354 530 Z"
            fill="#4F2E1E"
          />

          {/* Lapels of Blazer */}
          <path
            d="M 235 555 L 310 680 L 290 730 L 205 605 Z"
            fill="#232226"
            stroke="#2E2C33"
            strokeWidth="1.5"
          />
          <path
            d="M 445 555 L 370 680 L 390 730 L 475 605 Z"
            fill="#201F23"
            stroke="#2E2C33"
            strokeWidth="1.5"
          />
          <path
            d="M 310 680 L 340 760 L 370 680 L 340 620 Z"
            fill="#0F0E11"
          />

          {/* Red Rim Lighting on Left Shoulder */}
          <path
            d="M 112 820 Q 138 630 235 555 L 245 565 Q 155 640 135 820 Z"
            fill="url(#leftRimRed)"
            style={{ opacity: rimLightIntensity / 100 }}
          />
          <path
            d="M 130 750 Q 160 620 220 565"
            stroke="#FF3838"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ opacity: rimLightIntensity / 100 }}
          />

          {/* Red Rim Lighting on Right Shoulder */}
          <path
            d="M 568 820 Q 542 630 445 555 L 435 565 Q 525 640 545 820 Z"
            fill="url(#rightRimRed)"
            style={{ opacity: rimLightIntensity / 100 }}
          />
          <path
            d="M 550 750 Q 520 620 460 565"
            stroke="#FF3838"
            strokeWidth="3.5"
            strokeLinecap="round"
            style={{ opacity: rimLightIntensity / 100 }}
          />
        </g>

        {/* Neck */}
        <g id="neck">
          <path
            d="M 298 430 L 295 540 Q 340 565 385 540 L 382 430 Z"
            fill="url(#neckGrad)"
          />
          {/* Adam's apple & throat shadow */}
          <path
            d="M 334 470 Q 340 482 346 470 L 344 495 Q 340 500 336 495 Z"
            fill="#573322"
            opacity="0.8"
          />
        </g>

        {/* Head and Face */}
        <g id="head">
          {/* Ears */}
          {/* Left Ear */}
          <ellipse cx="270" cy="360" rx="14" ry="26" fill="#A86F54" transform="rotate(-10 270 360)" />
          <path d="M 272 346 C 265 352 265 368 272 374" stroke="#704430" strokeWidth="2.5" fill="none" />
          
          {/* Right Ear */}
          <ellipse cx="410" cy="360" rx="14" ry="26" fill="#A86F54" transform="rotate(10 410 360)" />
          <path d="M 408 346 C 415 352 415 368 408 374" stroke="#704430" strokeWidth="2.5" fill="none" />

          {/* Face Base Structure */}
          <path
            d="M 276 280 C 272 230 310 210 340 210 C 370 210 408 230 404 280 C 402 330 406 380 395 435 C 385 470 360 488 340 488 C 320 488 295 470 285 435 C 274 380 278 330 276 280 Z"
            fill="url(#faceGrad)"
          />

          {/* Cheeks and Forehead highlights */}
          <path
            d="M 305 240 Q 340 230 375 240 Q 385 270 370 280 Q 340 285 310 280 Z"
            fill="#D5A384"
            opacity="0.3"
          />
          <ellipse cx="320" cy="370" rx="22" ry="14" fill="#CB9273" opacity="0.4" />
          <ellipse cx="360" cy="370" rx="22" ry="14" fill="#CB9273" opacity="0.4" />

          {/* Red Rim Light on Left Jawline */}
          <path
            d="M 274 380 Q 280 435 315 475"
            stroke="#FF2828"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{ opacity: rimLightIntensity / 100 }}
          />

          {/* Red Rim Light on Right Jawline */}
          <path
            d="M 406 380 Q 400 435 365 475"
            stroke="#FF2828"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{ opacity: rimLightIntensity / 100 }}
          />

          {/* Beard, Mustache and Goatee */}
          {/* Mustache */}
          <path
            d="M 315 410 C 325 403 336 405 340 408 C 344 405 355 403 365 410 C 358 422 346 422 340 416 C 334 422 322 422 315 410 Z"
            fill="#1E1917"
          />
          {/* Soul patch */}
          <path d="M 334 435 L 346 435 L 344 446 L 336 446 Z" fill="#1C1715" />
          {/* Chin & Jawline Beard */}
          <path
            d="M 285 385 C 290 440 310 488 340 488 C 370 488 390 440 395 385 C 388 410 375 465 340 465 C 305 465 292 410 285 385 Z"
            fill="#1E1918"
          />
          {/* Fine Stubble texture */}
          <path
            d="M 292 410 Q 340 470 388 410 Q 365 460 340 460 Q 315 460 292 410 Z"
            fill="#14100E"
            opacity="0.9"
          />

          {/* Mouth & Lips */}
          <path d="M 324 425 Q 340 431 356 425" stroke="#7A3F33" strokeWidth="2.5" fill="none" />
          <path d="M 326 426 Q 340 430 354 426" stroke="#481F1A" strokeWidth="1.2" fill="none" />

          {/* Nose */}
          <path
            d="M 336 320 L 332 375 Q 320 385 325 390 Q 334 394 340 392 Q 346 394 355 390 Q 360 385 348 375 L 344 320"
            fill="#9B684F"
            opacity="0.45"
          />
          <path
            d="M 330 388 C 336 393 344 393 350 388"
            stroke="#532E1D"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />
          <ellipse cx="327" cy="386" rx="2" ry="1.5" fill="#3D1D10" />
          <ellipse cx="353" cy="386" rx="2" ry="1.5" fill="#3D1D10" />

          {/* Eyebrows */}
          <path
            d="M 295 320 C 308 312 322 314 330 320 C 322 317 308 316 295 320 Z"
            fill="#1C1717"
          />
          <path
            d="M 385 320 C 372 312 358 314 350 320 C 358 317 372 316 385 320 Z"
            fill="#1C1717"
          />

          {/* Eyes */}
          {/* Left Eye */}
          <ellipse cx="316" cy="336" rx="10" ry="6" fill="#F8F3ED" />
          <circle cx="316" cy="336" r="4.5" fill="#2C1A14" />
          <circle cx="316" cy="336" r="2.2" fill="#0A0808" />
          <circle cx="317" cy="334" r="1.2" fill="#FFFFFF" />
          <path d="M 305 334 Q 316 328 327 334" stroke="#3D241C" strokeWidth="2.5" fill="none" />

          {/* Right Eye */}
          <ellipse cx="364" cy="336" rx="10" ry="6" fill="#F8F3ED" />
          <circle cx="364" cy="336" r="4.5" fill="#2C1A14" />
          <circle cx="364" cy="336" r="2.2" fill="#0A0808" />
          <circle cx="365" cy="334" r="1.2" fill="#FFFFFF" />
          <path d="M 353 334 Q 364 328 375 334" stroke="#3D241C" strokeWidth="2.5" fill="none" />

          {/* Modern Round Eyeglasses */}
          {/* Bridge */}
          <path
            d="M 334 332 Q 340 329 346 332"
            stroke="#2B2726"
            strokeWidth="2.8"
            fill="none"
          />
          <path
            d="M 334 332 Q 340 329 346 332"
            stroke="#D6A760"
            strokeWidth="0.8"
            fill="none"
          />

          {/* Left Rim */}
          <circle
            cx="315"
            cy="338"
            r="23"
            stroke="#1D1A19"
            strokeWidth="3.2"
            fill="url(#lensReflect)"
          />
          <circle
            cx="315"
            cy="338"
            r="22.5"
            stroke="#B58D54"
            strokeWidth="0.8"
            fill="none"
            opacity="0.85"
          />
          {/* Left Temple Arm to Ear */}
          <path d="M 292 334 L 272 344" stroke="#1D1A19" strokeWidth="2.5" />

          {/* Right Rim */}
          <circle
            cx="365"
            cy="338"
            r="23"
            stroke="#1D1A19"
            strokeWidth="3.2"
            fill="url(#lensReflect)"
          />
          <circle
            cx="365"
            cy="338"
            r="22.5"
            stroke="#B58D54"
            strokeWidth="0.8"
            fill="none"
            opacity="0.85"
          />
          {/* Right Temple Arm to Ear */}
          <path d="M 388 334 L 408 344" stroke="#1D1A19" strokeWidth="2.5" />
        </g>

        {/* Voluminous Curly Black Hair */}
        <g id="curly-hair">
          {/* Main Hair Volume Silhouette */}
          <path
            d="M 270 290 
               C 255 270 248 240 258 210 
               C 248 180 270 150 295 140 
               C 310 120 340 115 365 125 
               C 390 115 415 125 430 145 
               C 450 160 455 190 445 220 
               C 455 245 445 275 435 295 
               C 425 275 410 255 390 250 
               C 365 245 350 252 340 255 
               C 330 252 315 245 290 250 
               C 278 258 272 275 270 290 Z"
            fill="url(#hairGlow)"
          />

          {/* Stylized Individual Voluminous Curls & Texture */}
          {/* Top curls */}
          <circle cx="340" cy="135" r="26" fill="#181416" />
          <circle cx="310" cy="145" r="24" fill="#1C1719" />
          <circle cx="370" cy="145" r="24" fill="#161315" />
          <circle cx="285" cy="170" r="26" fill="#141113" />
          <circle cx="395" cy="170" r="26" fill="#191517" />
          <circle cx="265" cy="205" r="24" fill="#120F11" />
          <circle cx="415" cy="205" r="24" fill="#171315" />
          <circle cx="260" cy="245" r="22" fill="#141113" />
          <circle cx="420" cy="245" r="22" fill="#141113" />

          {/* Foreground detailed curls with subtle brown-black sheen */}
          <path d="M 320 155 Q 335 140 345 160 Q 355 145 365 165" stroke="#332A2D" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 295 175 Q 310 160 325 180" stroke="#332A2D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 355 175 Q 370 160 385 180" stroke="#332A2D" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 275 210 Q 290 195 305 215" stroke="#2B2426" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 375 210 Q 390 195 405 215" stroke="#2B2426" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 330 190 Q 345 178 355 195" stroke="#3A2F33" strokeWidth="3.5" strokeLinecap="round" fill="none" />

          {/* Forehead fringe curls */}
          <path d="M 292 240 Q 305 250 318 242 Q 330 252 342 245 Q 355 252 368 244 Q 380 250 392 242" stroke="#1A1516" strokeWidth="8" strokeLinecap="round" fill="none" />
          <path d="M 305 244 Q 315 255 325 246" stroke="#282224" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M 345 244 Q 355 255 365 246" stroke="#282224" strokeWidth="3" strokeLinecap="round" fill="none" />

          {/* Red rim lighting on top-left hair edges */}
          <path
            d="M 252 230 C 248 190 270 155 295 140 C 315 125 340 120 355 125"
            stroke="#FF2E2E"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
            style={{ opacity: (rimLightIntensity / 100) * 0.9 }}
          />
          {/* Red rim lighting on right hair edge */}
          <path
            d="M 425 230 C 435 190 415 155 395 140"
            stroke="#FF2E2E"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{ opacity: (rimLightIntensity / 100) * 0.7 }}
          />
        </g>
      </svg>
    </div>
  );
};
