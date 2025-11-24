import java.io.*;
import java.util.*;

public class ClinicManager {
    // Stores Patient objects, mapping ID to Patient for fast lookup
    private Map<String, Patient> patients; 
    
    // Stores Appointment objects, mapping AppointmentID (date_time) to Appointment for fast lookup and conflict check
    private Map<String, Appointment> appointments; 

    private static final String PATIENTS_FILE = "patients.dat";
    private static final String APPOINTMENTS_FILE = "appointments.dat";

    public ClinicManager() {
        this.patients = new HashMap<>();
        this.appointments = new HashMap<>();
        loadData(); // Load data upon initialization (FR06)
    }

    // --- Patient Management (FR01) ---

    public boolean registerPatient(String id, String name, String contactNumber) {
        if (patients.containsKey(id)) {
            System.out.println("Error: Patient ID " + id + " already exists.");
            return false;
        }
        patients.put(id, new Patient(id, name, contactNumber));
        System.out.println("Patient " + name + " registered successfully.");
        return true;
    }

    public Patient getPatient(String id) {
        return patients.get(id);
    }

    // **NEW METHOD**
    public List<Patient> getAllPatients() {
        List<Patient> patientList = new ArrayList<>(patients.values());
        // Sorts patients by ID for a clear, organized list
        patientList.sort(Comparator.comparing(Patient::getId)); 
        return patientList;
    }
    // **END NEW METHOD**

    // --- Appointment Management (FR02, FR03, FR05) ---

    public String scheduleAppointment(String patientId, String date, String time) {
        // 1. Check if patient exists
        Patient patient = getPatient(patientId);
        if (patient == null) {
            return "Error: Patient with ID " + patientId + " not found. Please register first.";
        }

        // 2. Conflict Check (FR03)
        String appointmentId = date + "_" + time;
        if (appointments.containsKey(appointmentId)) {
            return "Error: Time slot " + date + " at " + time + " is already booked.";
        }

        // 3. Create and Store
        Appointment newAppointment = new Appointment(date, time, patient);
        appointments.put(appointmentId, newAppointment);
        return "Appointment scheduled successfully! ID: " + appointmentId;
    }

    public boolean cancelAppointment(String appointmentId) {
        if (appointments.containsKey(appointmentId)) {
            Appointment cancelled = appointments.remove(appointmentId);
            System.out.println("Appointment " + appointmentId + " for " + cancelled.getPatient().getName() + " has been cancelled.");
            return true;
        } else {
            System.out.println("Error: Appointment ID " + appointmentId + " not found.");
            return false;
        }
    }

    // --- Schedule Viewing (FR04) ---

    public List<Appointment> viewAppointmentsByDate(String date) {
        List<Appointment> dailyAppointments = new ArrayList<>();
        for (Appointment appt : appointments.values()) {
            if (appt.getDate().equals(date)) {
                dailyAppointments.add(appt);
            }
        }
        // Sorting appointments by time
        dailyAppointments.sort(Comparator.comparing(Appointment::getTime)); 
        return dailyAppointments;
    }

    // --- Data Persistence (FR06) ---
    
    // Saves data using Java Serialization
    public void saveData() {
        try (ObjectOutputStream oosPatients = new ObjectOutputStream(new FileOutputStream(PATIENTS_FILE));
             ObjectOutputStream oosAppointments = new ObjectOutputStream(new FileOutputStream(APPOINTMENTS_FILE))) {

            oosPatients.writeObject(patients);
            oosAppointments.writeObject(appointments);
            System.out.println("\n*** Data saved successfully! ***");
        } catch (IOException e) {
            System.err.println("Error saving data: " + e.getMessage());
        }
    }

    // Loads data using Java Serialization
    @SuppressWarnings("unchecked") // Suppress warning for unchecked cast from Object to Map
    private void loadData() {
        try (ObjectInputStream oisPatients = new ObjectInputStream(new FileInputStream(PATIENTS_FILE))) {
            patients = (Map<String, Patient>) oisPatients.readObject();
            System.out.println("Patients data loaded.");
        } catch (FileNotFoundException e) {
            System.out.println("No existing patients file found. Starting fresh.");
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Error loading patients data: " + e.getMessage());
        }

        try (ObjectInputStream oisAppointments = new ObjectInputStream(new FileInputStream(APPOINTMENTS_FILE))) {
            appointments = (Map<String, Appointment>) oisAppointments.readObject();
            System.out.println("Appointments data loaded.");
        } catch (FileNotFoundException e) {
            System.out.println("No existing appointments file found. Starting fresh.");
        } catch (IOException | ClassNotFoundException e) {
            System.err.println("Error loading appointments data: " + e.getMessage());
        }
    }
}