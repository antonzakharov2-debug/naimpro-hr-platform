import { useState, useEffect } from 'react';
import './Dashboard.css';

const DashboardContent = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Генеруємо дні для календаря
  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const days = getDaysInMonth(currentTime);
  const today = currentTime.getDate();
  const monthName = currentTime.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <main className="dashboard-main">
      <div className="dashboard-grid">
        
        {/* Годинник */}
        <div className="widget widget-clock">
          <div className="analog-clock">
            <div className="clock-face">
              <div className="clock-center"></div>
              {[...Array(12)].map((_, i) => (
                <div key={i} className="clock-number" style={{
                  transform: `rotate(${i * 30}deg) translate(0, -90px)`
                }}>
                  <span style={{ transform: `rotate(-${i * 30}deg)` }}>
                    {i === 0 ? 12 : i}
                  </span>
                </div>
              ))}
              <div 
                className="clock-hand hour-hand"
                style={{
                  transform: `rotate(${(currentTime.getHours() % 12) * 30 + currentTime.getMinutes() * 0.5}deg)`
                }}
              />
              <div 
                className="clock-hand minute-hand"
                style={{
                  transform: `rotate(${currentTime.getMinutes() * 6}deg)`
                }}
              />
              <div 
                className="clock-hand second-hand"
                style={{
                  transform: `rotate(${currentTime.getSeconds() * 6}deg)`
                }}
              />
            </div>
          </div>
          <div className="digital-time">
            {currentTime.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}
          </div>
        </div>

        {/* Календар */}
        <div className="widget widget-calendar">
          <div className="widget-header">
            <h3>{monthName}</h3>
          </div>
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="calendar-day-name">{day}</div>
            ))}
            {days.map((day, index) => (
              <div 
                key={index} 
                className={`calendar-day ${day === today ? 'today' : ''} ${!day ? 'empty' : ''}`}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

export default DashboardContent;