import React from 'react';
import '../PhoneFrame.css';
import Navi from "./Navi";

interface PhoneFrameProps {
  children: React.ReactNode;
}

const PhoneFrame: React.FC<PhoneFrameProps> = ({ children }) => {
  return (
    <div className="phone-frame-wrapper">
      <div className="phone-frame-device">
        <div className="phone-frame-notch"></div>
        <div className="phone-frame-screen">
          {children}
          <Navi />
        </div>
        <div className="phone-frame-home-indicator"></div>
      </div>
    </div>
  );
};

export default PhoneFrame;