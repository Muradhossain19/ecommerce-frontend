"use client";

import { useState } from "react";
import { Mail, Send, Check, AlertCircle } from "lucide-react";
import styles from "./Newsletter.module.css";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email address");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setStatus("success");
      setMessage("Thank you for subscribing!");
      setEmail("");

      // Reset status after 3 seconds
      setTimeout(() => {
        setStatus("idle");
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("Subscription error:", error);
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.newsletterWrapper}>
          {/* Left Content */}
          <div className={styles.contentArea}>
            <div className={styles.iconWrapper}>
              <Mail className={styles.mailIcon} size={28} />
            </div>

            <div className={styles.textContent}>
              <h2 className={styles.title}>Stay in the Loop</h2>
              <p className={styles.subtitle}>
                Subscribe to our newsletter and be the first to know about new
                arrivals, exclusive deals, and special offers.
              </p>

              <div className={styles.benefitsList}>
                <div className={styles.benefit}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>Weekly fashion updates</span>
                </div>
                <div className={styles.benefit}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>Exclusive subscriber discounts</span>
                </div>
                <div className={styles.benefit}>
                  <Check size={16} className={styles.checkIcon} />
                  <span>Early access to sales</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Form Area */}
          <div className={styles.formArea}>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputWrapper}>
                <div className={styles.inputContainer}>
                  <Mail size={20} className={styles.inputIcon} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className={`${styles.emailInput} ${
                      status === "error" ? styles.inputError : ""
                    }`}
                    disabled={status === "loading"}
                  />
                </div>

                <button
                  type="submit"
                  className={`${styles.submitButton} ${styles[status]}`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <div className={styles.spinner} />
                  ) : status === "success" ? (
                    <Check size={20} />
                  ) : (
                    <>
                      <Send size={18} />
                      <span className={styles.buttonText}>Subscribe</span>
                    </>
                  )}
                </button>
              </div>

              {/* Status Message */}
              {message && (
                <div className={`${styles.statusMessage} ${styles[status]}`}>
                  {status === "error" && <AlertCircle size={16} />}
                  {status === "success" && <Check size={16} />}
                  <span>{message}</span>
                </div>
              )}
            </form>

            <p className={styles.disclaimer}>
              By subscribing, you agree to our Privacy Policy and consent to
              receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
