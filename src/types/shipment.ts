export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  route: string;
  vehicle_type: string;
  status: "Assigned" | "Not Assigned";
  assigned_transporter: string | null;
}
