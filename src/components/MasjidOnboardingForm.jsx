import React, { useState } from 'react';
import {
  Building, MapPin, Navigation, User, Phone, Shield,
  ArrowRight, ArrowLeft, Clock, CheckCircle2, PlusCircle
} from 'lucide-react';

const initialFormState = {
  name: '',
  address_line_1: '',
  address_line_2: '',
  city: '',
  latitude: '',
  longitude: '',
  admin_name: '',
  admin_email: '',
  admin_password: '',
  imam_name: '',
  imam_phone: '',
  maktab_available: false,
  maktab_details: '',
  women_prayer_area_available: false,
  // Timings
  fajr_azaan: '05:30', fajr_jamaat: '05:45',
  dhuhr_azaan: '13:00', dhuhr_jamaat: '13:30',
  asr_azaan: '17:15', asr_jamaat: '17:45',
  maghrib_azaan: '18:50', maghrib_jamaat: '18:55',
  isha_azaan: '20:15', isha_jamaat: '20:45',
  jumuah_azaan: '13:00', jumuah_jamaat: '13:30',
  jumuah_jamaat_2: '', jumuah_jamaat_3: ''
};

export default function MasjidOnboardingForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialFormState);
  const [extraJumuahCount, setExtraJumuahCount] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value
    });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.address_line_1 || !formData.address_line_2 || !formData.city) {
      setError('Please fill in all required (*) basic information fields.');
      return;
    }
    setError('');
    setStep(2);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleBack = () => {
    setStep(1);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSubmitted(true);
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  const renderTimingRow = (prayerName, azaanField, jamaatField) => (
    <div className="timing-row-grid" style={{ gap: '18px', marginBottom: '18px', alignItems: 'end' }}>
      <div>
        <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-black)', fontSize: '0.92rem', fontWeight: 700 }}>
          {prayerName}
        </label>
      </div>
      <div>
        {azaanField && (
          <>
            <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-gray)', fontSize: '0.8rem', fontWeight: 600 }}>
              Azaan Time
            </label>
            <div style={{ position: 'relative' }}>
              <Clock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
              <input
                type="time"
                name={azaanField}
                value={formData[azaanField] || ''}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 40px',
                  borderRadius: '12px',
                  border: '1px solid var(--border-line)',
                  background: '#f8fafc',
                  fontSize: '0.9rem'
                }}
              />
            </div>
          </>
        )}
      </div>
      <div>
        <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-gray)', fontSize: '0.8rem', fontWeight: 600 }}>
          Jamaat Time
        </label>
        <div style={{ position: 'relative' }}>
          <Clock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
          <input
            type="time"
            name={jamaatField}
            value={formData[jamaatField] || ''}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '12px 14px 12px 40px',
              borderRadius: '12px',
              border: '1px solid var(--border-line)',
              background: '#f8fafc',
              fontSize: '0.9rem'
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <section className="animate-fade-in" style={{ padding: '60px 0 100px' }}>
      <div className="container" style={{ maxWidth: '880px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <span className="pill-badge" style={{ marginBottom: '14px' }}>
            <Building size={14} color="#4eb00a" /> Masjid Onboarding & Verification
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--text-black)', marginBottom: '12px' }}>
            Register Your Masjid
          </h1>
          <p style={{ color: 'var(--text-gray)', fontSize: '1.02rem', maxWidth: '640px', margin: '0 auto', lineHeight: 1.6 }}>
            Submit your masjid's official profile, administration details, and prayer timings for community verification.
          </p>
        </div>

        <div className="clean-form" style={{ padding: '44px', borderRadius: '24px', border: '1px solid var(--border-line)', background: 'white', boxShadow: '0 10px 35px rgba(0,0,0,0.03)' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <CheckCircle2 size={56} color="#4eb00a" style={{ margin: '0 auto 20px' }} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-black)', marginBottom: '12px' }}>
                Masjid Submitted for Verification
              </h2>
              <p style={{ color: 'var(--text-gray)', fontSize: '1rem', maxWidth: '540px', margin: '0 auto 24px', lineHeight: 1.6 }}>
                Alhamdulillah! Your masjid profile for <strong>{formData.name}</strong> ({formData.city}) has been successfully submitted to our verification team.
              </p>
              <div style={{ background: '#f8fafc', padding: '20px 24px', borderRadius: '16px', border: '1px solid var(--border-line)', maxWidth: '540px', margin: '0 auto 28px', textAlign: 'left', fontSize: '0.9rem', color: 'var(--text-black)' }}>
                <div style={{ fontWeight: 700, marginBottom: '8px', color: '#166534' }}>What happens next?</div>
                <ul style={{ paddingLeft: '18px', color: 'var(--text-gray)', lineHeight: 1.7 }}>
                  <li>Our verification queue reviews the masjid address and imam/admin credentials.</li>
                  <li>Once verified, your masjid will appear live on the ConnectMasjid mobile & web directory.</li>
                  <li>You will receive login access to update daily prayer & Jamaat schedules anytime.</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => { setSubmitted(false); setStep(1); setFormData(initialFormState); }}
                className="btn btn-outline"
                style={{ padding: '12px 28px', fontWeight: 700 }}
              >
                Register Another Masjid
              </button>
            </div>
          ) : (
            <>
              {/* Step indicator header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px', paddingBottom: '20px', borderBottom: '1px solid var(--border-line)' }}>
                <div>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-black)' }}>
                    {step === 1 ? 'Step 1 of 2: Basic Information & Roles' : 'Step 2 of 2: Daily Prayer & Jamaat Timings'}
                  </h2>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <span style={{ width: '32px', height: '8px', borderRadius: '999px', background: '#4eb00a' }} />
                  <span style={{ width: '32px', height: '8px', borderRadius: '999px', background: step === 2 ? '#4eb00a' : '#e2e8f0' }} />
                </div>
              </div>

              {error && (
                <div style={{ padding: '14px 18px', background: '#fef2f2', color: '#dc2626', borderRadius: '12px', fontSize: '0.9rem', fontWeight: 600, marginBottom: '20px' }}>
                  {error}
                </div>
              )}

              {step === 1 ? (
                <form onSubmit={handleNext}>
                  {/* Mosque Name */}
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                      Mosque Name *
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Building size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Central Islamic Center"
                        style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                      />
                    </div>
                  </div>

                  {/* Address Line 1 & 2 */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Address Line 1 *
                      </label>
                      <div style={{ position: 'relative' }}>
                        <MapPin size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                        <input
                          type="text"
                          name="address_line_1"
                          required
                          value={formData.address_line_1}
                          onChange={handleChange}
                          placeholder="e.g. Sayyed Nagar Lane No 12a"
                          style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Address Line 2 / Area *
                      </label>
                      <input
                        type="text"
                        name="address_line_2"
                        required
                        value={formData.address_line_2}
                        onChange={handleChange}
                        placeholder="e.g. Hadapsar"
                        style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                      />
                    </div>
                  </div>

                  {/* City & Latitude */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Pune"
                        style={{ width: '100%', padding: '13px 16px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Latitude
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Navigation size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                        <input
                          type="number"
                          step="any"
                          name="latitude"
                          value={formData.latitude}
                          onChange={handleChange}
                          placeholder="e.g. 18.4870207"
                          style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Longitude & Admin Name */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Longitude
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Navigation size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                        <input
                          type="number"
                          step="any"
                          name="longitude"
                          value={formData.longitude}
                          onChange={handleChange}
                          placeholder="e.g. 73.9292091"
                          style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Assign Admin Name (Optional)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                        <input
                          type="text"
                          name="admin_name"
                          value={formData.admin_name}
                          onChange={handleChange}
                          placeholder="Admin's Full Name"
                          style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Admin Email & Admin Password */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Assign Admin Email (Optional)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Shield size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                        <input
                          type="email"
                          name="admin_email"
                          value={formData.admin_email}
                          onChange={handleChange}
                          placeholder="admin@mosque.com"
                          style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Assign Admin Password (Optional)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Shield size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                        <input
                          type="password"
                          name="admin_password"
                          value={formData.admin_password}
                          onChange={handleChange}
                          placeholder="Create Admin Password"
                          style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Imam Name & Phone */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '24px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Imam Name (Optional)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <User size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                        <input
                          type="text"
                          name="imam_name"
                          value={formData.imam_name}
                          onChange={handleChange}
                          placeholder="Imam's Name"
                          style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                        />
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-black)', fontSize: '0.9rem', fontWeight: 700 }}>
                        Imam Phone (Optional)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-gray)' }} />
                        <input
                          type="text"
                          name="imam_phone"
                          value={formData.imam_phone}
                          onChange={handleChange}
                          placeholder="Imam's Contact"
                          style={{ width: '100%', padding: '13px 16px 13px 44px', borderRadius: '12px', border: '1px solid var(--border-line)', background: '#f8fafc', fontSize: '0.92rem' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Checkboxes: Maktab & Women's Prayer Area */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                    <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid var(--border-line)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <input
                          type="checkbox"
                          id="maktab_available"
                          name="maktab_available"
                          checked={formData.maktab_available}
                          onChange={handleChange}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="maktab_available" style={{ fontWeight: 700, color: 'var(--text-black)', cursor: 'pointer' }}>
                          Maktab / Madrassah Available
                        </label>
                      </div>
                      {formData.maktab_available && (
                        <div>
                          <label style={{ display: 'block', marginBottom: '6px', color: 'var(--text-gray)', fontSize: '0.85rem', fontWeight: 600 }}>
                            Maktab Details / Class Times
                          </label>
                          <textarea
                            name="maktab_details"
                            value={formData.maktab_details || ''}
                            onChange={handleChange}
                            rows={3}
                            style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-line)', background: 'white', fontSize: '0.88rem' }}
                            placeholder="Enter class timings, levels, contact info..."
                          />
                        </div>
                      )}
                    </div>

                    <div style={{ background: '#f8fafc', padding: '18px', borderRadius: '16px', border: '1px solid var(--border-line)', display: 'flex', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <input
                          type="checkbox"
                          id="women_prayer_area_available"
                          name="women_prayer_area_available"
                          checked={formData.women_prayer_area_available}
                          onChange={handleChange}
                          style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                        />
                        <label htmlFor="women_prayer_area_available" style={{ fontWeight: 700, color: 'var(--text-black)', cursor: 'pointer' }}>
                          Prayer Room / Space for Women Available
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Step 1 Submit button */}
                  <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid var(--border-line)' }}>
                    <button type="submit" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      Continue to Timings <ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: '24px' }}>
                    <p style={{ color: 'var(--text-gray)', fontSize: '0.95rem' }}>
                      Enter the daily prayer times for <strong>{formData.name || 'this mosque'}</strong>. All times are sent for verification before going live.
                    </p>
                  </div>

                  {renderTimingRow('Fajr', 'fajr_azaan', 'fajr_jamaat')}
                  {renderTimingRow('Dhuhr', 'dhuhr_azaan', 'dhuhr_jamaat')}
                  {renderTimingRow('Asr', 'asr_azaan', 'asr_jamaat')}
                  {renderTimingRow('Maghrib', 'maghrib_azaan', 'maghrib_jamaat')}
                  {renderTimingRow('Isha', 'isha_azaan', 'isha_jamaat')}
                  {renderTimingRow('Jumuah', 'jumuah_azaan', 'jumuah_jamaat')}
                  {extraJumuahCount >= 1 && renderTimingRow('Jumuah 2', null, 'jumuah_jamaat_2')}
                  {extraJumuahCount >= 2 && renderTimingRow('Jumuah 3', null, 'jumuah_jamaat_3')}

                  {extraJumuahCount < 2 && (
                    <div style={{ marginBottom: '28px' }}>
                      <button
                        type="button"
                        onClick={() => setExtraJumuahCount(prev => prev + 1)}
                        className="btn btn-outline"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem', padding: '10px 18px' }}
                      >
                        <PlusCircle size={16} /> Add Multiple Jumuah Jamaats
                      </button>
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '20px', borderTop: '1px solid var(--border-line)' }}>
                    <button
                      type="button"
                      onClick={handleBack}
                      className="btn btn-outline"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
                    >
                      <ArrowLeft size={16} /> Back to Step 1
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 32px', fontSize: '1rem' }}
                    >
                      Submit for Verification <ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
