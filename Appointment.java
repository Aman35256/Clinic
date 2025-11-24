import java.io.Serializable;

public class Appointment implements Serializable {
    private String appointmentID;
    private String date; // Format: YYYY-MM-DD
    private String time; // Format: HH:MM (24-hour)
    private Patient patient; // Association with Patient class

    public Appointment(String date, String time, Patient patient) {
        this.date = date;
        this.time = time;
        // Unique ID based on date/time for conflict checking and lookup
        this.appointmentID = date + "_" + time; 
        this.patient = patient;
    }

    // Getters
    public String getAppointmentID() {
        return appointmentID;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public Patient getPatient() {
        return patient;
    }

    @Override
    public String toString() {
        return "Appointment ID: " + appointmentID + 
            " | Date: " + date + 
            " | Time: " + time + 
            " | Patient: " + patient.getName() + " (" + patient.getId() + ")";
    }
}