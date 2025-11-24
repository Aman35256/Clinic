import java.io.Serializable;

public class Patient implements Serializable {
    private String id;
    private String name;
    private String contactNumber;

    public Patient(String id, String name, String contactNumber) {
        this.id = id;
        this.name = name;
        this.contactNumber = contactNumber;
    }

    // Getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    // Setter (for updating contact, if needed)
    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    @Override
    public String toString() {
        return "ID: " + id + ", Name: " + name + ", Contact: " + contactNumber;
    }
}