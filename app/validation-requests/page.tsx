"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

interface ValidationRequest {
    id: String;
    resumeId: string;
    versionId: string;
    accepted: boolean;
    requesterUserId: string;
    acceptorUserId?: string;
}

const ValidationRequestsPage: React.FC = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
            const response = await axios.get<User>("http://localhost:8081/api/v1/auth/me", {
                withCredentials: true,
            });
            console.log("current user", response.data);
            setCurrentUser(response.data);
            console.log("current user", currentUser);
            } catch (err) {
            console.error("Failed to fetch current user.");
            }
        };

        fetchUser();
    }, []);
    const [requests, setRequests] = useState<ValidationRequest[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // For email modal
    const [showEmailModal, setShowEmailModal] = useState(false);
    const [emailRequest, setEmailRequest] = useState<ValidationRequest | null>(null);
    const [emailForm, setEmailForm] = useState({ to: "", subject: "", body: "" });
    const [sending, setSending] = useState(false);
    const [sendSuccess, setSendSuccess] = useState<string | null>(null);
    const [sendError, setSendError] = useState<string | null>(null);

    const fetchRequests = async () => {
        try {
        setLoading(true);

        let url = "http://localhost:8081/api/v1/validation/me";
        if (currentUser?.role === "ADMIN") {
            url = "http://localhost:8081/api/v1/validation";
        }

        const response = await axios.get<ValidationRequest[]>(url, {
            withCredentials: true,
        });
        setRequests(response.data);
        setError(null);
        } catch (err) {
        setError("Failed to load validation requests.");
        } finally {
        setLoading(false);
        }
    };
    
    useEffect(() => {
        if (currentUser) fetchRequests(); 
    }, [currentUser]);
  

  const openEmailModal = (request: ValidationRequest) => {
    setEmailRequest(request);
    setEmailForm({ to: "", subject: "", body: "" });
    setSendSuccess(null);
    setSendError(null);
    setShowEmailModal(true);
  };

  const closeEmailModal = () => {
    setShowEmailModal(false);
    setEmailRequest(null);
  };

  const handleEmailFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
  };

  const sendEmail = async () => {
    if (!emailRequest) return;
    setSending(true);
    setSendSuccess(null);
    setSendError(null);

    try {
      await axios.post(
        "http://localhost:8081/api/v1/notification/send",
        {
          versionId: emailRequest.versionId,
          recipientEmail: emailForm.to,
          subject: emailForm.subject,
          body: emailForm.body,
        },
        {
          withCredentials: true,
        }
      );
      setSendSuccess("Email sent successfully!");
    } catch (err) {
      setSendError("Failed to send email.");
    } finally {
      setSending(false);
    }
  };

    const approveRequest = async (request: ValidationRequest) => {
        try {
            await axios.patch(
                `http://localhost:8081/api/v1/validation/${request.id}`,
                {},
                { withCredentials: true }
            );

            // Re-fetch updated list
            fetchRequests();
        } catch (err) {
            alert("Failed to approve request.");
        }
    };


  return (
    <div style={{ padding: 20 }}>
      <h1>Your Validation Requests</h1>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && requests.length === 0 && <p>No validation requests found.</p>}

      <table border={1} cellPadding={10} cellSpacing={0} style={{ width: "100%", marginTop: 20 }}>
        <thead>
          <tr>
            <th>Resume ID</th>
            <th>Version ID</th>
            <th>Approval Status</th>
            <th>Approver</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.versionId}>
              <td>{req.resumeId}</td>
              <td>{req.versionId}</td>
              <td>{req.accepted ? "Yes" : "No"}</td>
              <td>{req.accepted ? req.acceptorUserId || "Unknown" : "-"}</td>
              <td>
                {currentUser?.role === "ADMIN" && !req.accepted ? (
                    <button onClick={() => approveRequest(req)}>Approve</button>
                ) : req.accepted ? (
                    <button onClick={() => openEmailModal(req)}>Send Email</button>
                ) : (
                    "-"
                )}
                </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Email Modal */}
      {showEmailModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
          onClick={closeEmailModal}
        >
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 8,
              minWidth: 400,
              position: "relative",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>Send Email for Validation Request {emailRequest?.versionId}</h2>

            <label>
              To:
              <input
                type="email"
                name="to"
                value={emailForm.to}
                onChange={handleEmailFormChange}
                required
                style={{ width: "100%", marginBottom: 10 }}
              />
            </label>
            <label>
              Subject:
              <input
                type="text"
                name="subject"
                value={emailForm.subject}
                onChange={handleEmailFormChange}
                required
                style={{ width: "100%", marginBottom: 10 }}
              />
            </label>
            <label>
              Body:
              <textarea
                name="body"
                value={emailForm.body}
                onChange={handleEmailFormChange}
                required
                rows={6}
                style={{ width: "100%", marginBottom: 10 }}
              />
            </label>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={closeEmailModal} disabled={sending}>
                Cancel
              </button>
              <button onClick={sendEmail} disabled={sending}>
                {sending ? "Sending..." : "Send Email"}
              </button>
            </div>

            {sendSuccess && <p style={{ color: "green" }}>{sendSuccess}</p>}
            {sendError && <p style={{ color: "red" }}>{sendError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default ValidationRequestsPage;
