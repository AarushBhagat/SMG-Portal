import { useState } from 'react';
import { Home, Search, ChevronLeft, ChevronRight } from 'lucide-react';

interface GuestHouse {
  name: string;
  address: string;
  propertyNo: string;
  maintainedBy: string;
  contact: string;
  email: string;
}

export const GuestHouseList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const allGuestHouses: GuestHouse[] = [
    // HOSHIARPUR
    { name: "Vatika Resort", address: "Dasuya road, Opposite New Mandi, Hoshiarpur", contact: "01882-269269", propertyNo: "GH-HSP-001", maintainedBy: "SMG Facilities Team", email: "vatika.hsp@smg.com" },
    { name: "Hotel Comfort Inn", address: "Near Bus Stand Hoshiarpur", contact: "01882-222100", propertyNo: "GH-HSP-002", maintainedBy: "SMG Facilities Team", email: "comfort.hsp@smg.com" },
    { name: "Hotel Sunstar Grand", address: "The Mall Road, Near KFC, Hoshiarpur", contact: "01882-220180", propertyNo: "GH-HSP-003", maintainedBy: "SMG Facilities Team", email: "sunstar.hsp@smg.com" },
    { name: "Hotel Suraj Residency", address: "Jalandhar Road, Near ICICI Bank, Hoshiarpur", contact: "01882-224060", propertyNo: "GH-HSP-004", maintainedBy: "SMG Facilities Team", email: "suraj.res.hsp@smg.com" },
    { name: "Hotel Suraj Deluxe", address: "GT Road, Near Petrol Pump, Hoshiarpur", contact: "01882-222580", propertyNo: "GH-HSP-005", maintainedBy: "SMG Facilities Team", email: "suraj.dlx.hsp@smg.com" },
    { name: "Hotel Suraj", address: "Near Bus Stand, Hoshiarpur", contact: "01882-222060", propertyNo: "GH-HSP-006", maintainedBy: "SMG Facilities Team", email: "suraj.hsp@smg.com" },
    { name: "Luxury Hotel", address: "Jalandhar road, Near HP Petrol Pump, Hoshiarpur", contact: "01882-227777", propertyNo: "GH-HSP-007", maintainedBy: "SMG Facilities Team", email: "luxury.hsp@smg.com" },
    { name: "Hotel Cheema Regency", address: "Jalandhar Road, Near Bank of Baroda, Hoshiarpur", contact: "01882-225522", propertyNo: "GH-HSP-008", maintainedBy: "SMG Facilities Team", email: "cheema.hsp@smg.com" },
    { name: "Shingar Classic", address: "Near Bus Stand, Hoshiarpur", contact: "01882-220228", propertyNo: "GH-HSP-009", maintainedBy: "SMG Facilities Team", email: "shingar.classic.hsp@smg.com" },
    { name: "Hotel Shingar International", address: "Jalandhar Road, Hoshiarpur", contact: "01882-223228", propertyNo: "GH-HSP-010", maintainedBy: "SMG Facilities Team", email: "shingar.intl.hsp@smg.com" },
    
    // JALANDHAR
    { name: "Hotel Green Acres", address: "Opp. Bus Stand, B.M.C.Chowk, Jalandhar City-144001", contact: "0181-2224233, 2451000", propertyNo: "GH-JLD-001", maintainedBy: "SMG Facilities Team", email: "greenacres.jld@smg.com" },
    { name: "The Maya Hotel Jalandhar", address: "G.T Road, Near Lovely Professional University, Jalandhar-144001", contact: "0181-2401818", propertyNo: "GH-JLD-002", maintainedBy: "SMG Facilities Team", email: "maya.jld@smg.com" },
    { name: "Regent Park Hotel", address: "M.B.D Mall, GT Road, Jalandhar-144001", contact: "0181-5016444", propertyNo: "GH-JLD-003", maintainedBy: "SMG Facilities Team", email: "regentpark.jld@smg.com" },
    { name: "Radisson Hotel Jalandhar", address: "D.C Complex, Old GT Road, Jalandhar-144001", contact: "0181-6600000", propertyNo: "GH-JLD-004", maintainedBy: "SMG Facilities Team", email: "radisson.jld@smg.com" },
    { name: "Hotel President", address: "Near Bus Stand, B.M.C Chowk, Jalandhar City-144001", contact: "0181-2229977", propertyNo: "GH-JLD-005", maintainedBy: "SMG Facilities Team", email: "president.jld@smg.com" },
    { name: "Hotel Skylark", address: "Near Bus Stand, BMC Chowk, Jalandhar-144001", contact: "0181-2220162", propertyNo: "GH-JLD-006", maintainedBy: "SMG Facilities Team", email: "skylark.jld@smg.com" },
    { name: "Hotel Residency", address: "Near Bus Stand, BMC Chowk, Jalandhar-144001", contact: "0181-2220866", propertyNo: "GH-JLD-007", maintainedBy: "SMG Facilities Team", email: "residency.jld@smg.com" },
    { name: "Country Inn & Suites", address: "GT Road, Near Lovely Professional University, Jalandhar-144001", contact: "0181-7101111", propertyNo: "GH-JLD-008", maintainedBy: "SMG Facilities Team", email: "countryinn.jld@smg.com" },
    { name: "Hotel MBD Inn", address: "GT Road, Near Lovely Professional University, Jalandhar-144001", contact: "0181-5060000", propertyNo: "GH-JLD-009", maintainedBy: "SMG Facilities Team", email: "mbd.jld@smg.com" },
    { name: "The Grand Legacy", address: "GT Road, Near Lovely Professional University, Jalandhar-144001", contact: "0181-5055555", propertyNo: "GH-JLD-010", maintainedBy: "SMG Facilities Team", email: "grandlegacy.jld@smg.com" },
    { name: "Ramada Jalandhar", address: "GT Road, Near Lovely Professional University, Jalandhar-144001", contact: "0181-5050505", propertyNo: "GH-JLD-011", maintainedBy: "SMG Facilities Team", email: "ramada.jld@smg.com" },
    { name: "Hotel Teg Royale", address: "GT Road, Near Lovely Professional University, Jalandhar-144001", contact: "0181-5031111", propertyNo: "GH-JLD-012", maintainedBy: "SMG Facilities Team", email: "tegroyale.jld@smg.com" },
    { name: "Hotel Icon", address: "Near Bus Stand, BMC Chowk, Jalandhar-144001", contact: "0181-2222555", propertyNo: "GH-JLD-013", maintainedBy: "SMG Facilities Team", email: "icon.jld@smg.com" },
    
    // LUDHIANA
    { name: "Park Plaza", address: "Ferozepur Road, Ludhiana-141001", contact: "0161-5000000", propertyNo: "GH-LDH-001", maintainedBy: "SMG Facilities Team", email: "parkplaza.ldh@smg.com" },
    { name: "Hyatt Regency", address: "Industrial Area A, Ludhiana-141003", contact: "0161-5060000", propertyNo: "GH-LDH-002", maintainedBy: "SMG Facilities Team", email: "hyatt.ldh@smg.com" },
    { name: "Radisson Blu", address: "Ferozepur Road, Ludhiana-141001", contact: "0161-5090000", propertyNo: "GH-LDH-003", maintainedBy: "SMG Facilities Team", email: "radisson.ldh@smg.com" },
    { name: "Hotel Maharaja Regency", address: "Ferozepur Road, Ludhiana-141001", contact: "0161-2401801", propertyNo: "GH-LDH-004", maintainedBy: "SMG Facilities Team", email: "maharaja.ldh@smg.com" },
    { name: "Fortune Park Estique", address: "Ferozepur Road, Ludhiana-141001", contact: "0161-5070000", propertyNo: "GH-LDH-005", maintainedBy: "SMG Facilities Team", email: "fortune.ldh@smg.com" },
    { name: "Hotel Elegance", address: "Ferozepur Road, Ludhiana-141001", contact: "0161-2400000", propertyNo: "GH-LDH-006", maintainedBy: "SMG Facilities Team", email: "elegance.ldh@smg.com" },
    { name: "Hotel Residency", address: "Near Railway Station, Ludhiana-141001", contact: "0161-2740444", propertyNo: "GH-LDH-007", maintainedBy: "SMG Facilities Team", email: "residency.ldh@smg.com" },
    { name: "Hotel City Heart Premium", address: "Ferozepur Road, Ludhiana-141001", contact: "0161-5080000", propertyNo: "GH-LDH-008", maintainedBy: "SMG Facilities Team", email: "cityheart.ldh@smg.com" },
    { name: "Hotel Sapphire International", address: "Ferozepur Road, Ludhiana-141001", contact: "0161-2460000", propertyNo: "GH-LDH-009", maintainedBy: "SMG Facilities Team", email: "sapphire.ldh@smg.com" },
    { name: "The Park Residency", address: "GT Road, Ludhiana-141001", contact: "0161-5200000", propertyNo: "GH-LDH-010", maintainedBy: "SMG Facilities Team", email: "parkres.ldh@smg.com" },
    { name: "Hotel Silver Oak", address: "Ferozepur Road, Ludhiana-141001", contact: "0161-2455555", propertyNo: "GH-LDH-011", maintainedBy: "SMG Facilities Team", email: "silveroak.ldh@smg.com" },
    { name: "Hotel Presidency", address: "Near Railway Station, Ludhiana-141001", contact: "0161-2750000", propertyNo: "GH-LDH-012", maintainedBy: "SMG Facilities Team", email: "presidency.ldh@smg.com" },
    { name: "The Grand Regency", address: "Ferozepur Road, Ludhiana-141001", contact: "0161-5100000", propertyNo: "GH-LDH-013", maintainedBy: "SMG Facilities Team", email: "grandregency.ldh@smg.com" },
    { name: "Hotel Royal Palace", address: "GT Road, Ludhiana-141001", contact: "0161-2300000", propertyNo: "GH-LDH-014", maintainedBy: "SMG Facilities Team", email: "royalpalace.ldh@smg.com" },
    
    // NEW DELHI
    { name: "The Ashok", address: "50-B, Diplomatic Enclave, Chanakyapuri, New Delhi-110021", contact: "011-26110101", propertyNo: "GH-DEL-001", maintainedBy: "SMG Facilities Team", email: "ashok.del@smg.com" },
    { name: "The Lalit", address: "Barakhamba Avenue, Connaught Place, New Delhi-110001", contact: "011-43503030", propertyNo: "GH-DEL-002", maintainedBy: "SMG Facilities Team", email: "lalit.del@smg.com" },
    { name: "Shangri-La's", address: "19, Ashoka Road, Connaught Place, New Delhi-110001", contact: "011-41191919", propertyNo: "GH-DEL-003", maintainedBy: "SMG Facilities Team", email: "shangrila.del@smg.com" },
    { name: "Hotel Le Meridien", address: "Windsor Place, Janpath, New Delhi-110001", contact: "011-23710101", propertyNo: "GH-DEL-004", maintainedBy: "SMG Facilities Team", email: "lemeridien.del@smg.com" },
    { name: "The Imperial", address: "Janpath, New Delhi-110001", contact: "011-23341234", propertyNo: "GH-DEL-005", maintainedBy: "SMG Facilities Team", email: "imperial.del@smg.com" },
    { name: "Hotel Maurya", address: "Sardar Patel Marg, Diplomatic Enclave, New Delhi-110021", contact: "011-26112233", propertyNo: "GH-DEL-006", maintainedBy: "SMG Facilities Team", email: "maurya.del@smg.com" },
    { name: "Radisson Blu Plaza", address: "NH-8, Mahipalpur, New Delhi-110037", contact: "011-26771800", propertyNo: "GH-DEL-007", maintainedBy: "SMG Facilities Team", email: "radisson.del@smg.com" },
    { name: "Hotel Samrat", address: "Kautilya Marg, Chanakyapuri, New Delhi-110021", contact: "011-26110606", propertyNo: "GH-DEL-008", maintainedBy: "SMG Facilities Team", email: "samrat.del@smg.com" },
    { name: "The Claridges", address: "12, Dr. A.P.J Abdul Kalam Road, New Delhi-110011", contact: "011-39551152", propertyNo: "GH-DEL-009", maintainedBy: "SMG Facilities Team", email: "claridges.del@smg.com" },
    { name: "ITC Maurya", address: "Sardar Patel Marg, Diplomatic Enclave, New Delhi-110021", contact: "011-26112233", propertyNo: "GH-DEL-010", maintainedBy: "SMG Facilities Team", email: "itc.del@smg.com" },
    { name: "The Oberoi", address: "Dr. Zakir Hussain Marg, New Delhi-110003", contact: "011-24363030", propertyNo: "GH-DEL-011", maintainedBy: "SMG Facilities Team", email: "oberoi.del@smg.com" },
    { name: "Taj Palace", address: "2, Sardar Patel Marg, Diplomatic Enclave, New Delhi-110021", contact: "011-26110202", propertyNo: "GH-DEL-012", maintainedBy: "SMG Facilities Team", email: "taj.del@smg.com" },
    { name: "Le Meridien", address: "Windsor Place, Janpath, New Delhi-110001", contact: "011-23710101", propertyNo: "GH-DEL-013", maintainedBy: "SMG Facilities Team", email: "meridien.del@smg.com" },
    
    // CHANDIGARH  
    { name: "Hotel Mountview", address: "Sector 10, Chandigarh-160011", contact: "0172-2740544", propertyNo: "GH-CHD-001", maintainedBy: "SMG Facilities Team", email: "mountview.chd@smg.com" },
    { name: "Hotel President", address: "Sector 26, Chandigarh-160019", contact: "0172-2705555", propertyNo: "GH-CHD-002", maintainedBy: "SMG Facilities Team", email: "president.chd@smg.com" },
    { name: "JW Marriott", address: "Dakshin Marg, Sector 35-B, Chandigarh-160022", contact: "0172-3952000", propertyNo: "GH-CHD-003", maintainedBy: "SMG Facilities Team", email: "jwmarriott.chd@smg.com" },
    { name: "Taj Chandigarh", address: "Block No. 9, Sector 17-A, Chandigarh-160017", contact: "0172-6613000", propertyNo: "GH-CHD-004", maintainedBy: "SMG Facilities Team", email: "taj.chd@smg.com" },
    { name: "Hotel Shivalikview", address: "Sector 17-E, Chandigarh-160017", contact: "0172-2701234", propertyNo: "GH-CHD-005", maintainedBy: "SMG Facilities Team", email: "shivalik.chd@smg.com" },
    { name: "Hotel Parkview", address: "Sector 24-B, Chandigarh-160023", contact: "0172-2706000", propertyNo: "GH-CHD-006", maintainedBy: "SMG Facilities Team", email: "parkview.chd@smg.com" },
    { name: "The Lalit", address: "IT Park, Rajiv Gandhi Chandigarh Technology Park, Chandigarh-160101", contact: "0172-6610000", propertyNo: "GH-CHD-007", maintainedBy: "SMG Facilities Team", email: "lalit.chd@smg.com" },
    { name: "Hyatt Regency", address: "IT Park Road, Rajiv Gandhi Chandigarh Technology Park, Chandigarh-160101", contact: "0172-6677234", propertyNo: "GH-CHD-008", maintainedBy: "SMG Facilities Team", email: "hyatt.chd@smg.com" },
    { name: "Red Fox Hotel", address: "Sector 62, Sahibzada Ajit Singh Nagar, Chandigarh-160062", contact: "0172-5060000", propertyNo: "GH-CHD-009", maintainedBy: "SMG Facilities Team", email: "redfox.chd@smg.com" },
    { name: "Hotel Maya Palace", address: "Sector 22-B, Chandigarh-160022", contact: "0172-2707777", propertyNo: "GH-CHD-010", maintainedBy: "SMG Facilities Team", email: "maya.chd@smg.com" },
    { name: "Hotel Aroma", address: "Sector 22-C, Chandigarh-160022", contact: "0172-2708888", propertyNo: "GH-CHD-011", maintainedBy: "SMG Facilities Team", email: "aroma.chd@smg.com" },
    
    // HYDERABAD
    { name: "Taj Krishna", address: "Road No. 1, Banjara Hills, Hyderabad-500034", contact: "040-66292323", propertyNo: "GH-HYD-001", maintainedBy: "SMG Facilities Team", email: "tajkrishna.hyd@smg.com" },
    { name: "ITC Kakatiya", address: "6-3-1187, Begumpet, Hyderabad-500016", contact: "040-23400132", propertyNo: "GH-HYD-002", maintainedBy: "SMG Facilities Team", email: "itc.hyd@smg.com" },
    { name: "Novotel", address: "HICC Complex, Hyderabad-500084", contact: "040-66824422", propertyNo: "GH-HYD-003", maintainedBy: "SMG Facilities Team", email: "novotel.hyd@smg.com" },
    { name: "Radisson Blu", address: "Road No. 2, Banjara Hills, Hyderabad-500034", contact: "040-66666666", propertyNo: "GH-HYD-004", maintainedBy: "SMG Facilities Team", email: "radisson.hyd@smg.com" },
    { name: "The Park", address: "22, Raj Bhavan Road, Somajiguda, Hyderabad-500082", contact: "040-23753575", propertyNo: "GH-HYD-005", maintainedBy: "SMG Facilities Team", email: "park.hyd@smg.com" },
    { name: "Taj Deccan", address: "Road No. 1, Banjara Hills, Hyderabad-500034", contact: "040-66666666", propertyNo: "GH-HYD-006", maintainedBy: "SMG Facilities Team", email: "tajdeccan.hyd@smg.com" },
    { name: "Vivanta by Taj", address: "Road No. 1, Banjara Hills, Hyderabad-500034", contact: "040-66666789", propertyNo: "GH-HYD-007", maintainedBy: "SMG Facilities Team", email: "vivanta.hyd@smg.com" },
    
    // MUZZAFARNAGAR
    { name: "Hotel Grand Tulip", address: "Delhi Road, Muzzafarnagar-251001", contact: "0131-2654321", propertyNo: "GH-MUZ-001", maintainedBy: "SMG Facilities Team", email: "grandtulip.muz@smg.com" },
    { name: "Hotel Park Inn", address: "Hapur Road, Muzzafarnagar-251001", contact: "0131-2651111", propertyNo: "GH-MUZ-002", maintainedBy: "SMG Facilities Team", email: "parkinn.muz@smg.com" },
    { name: "Hotel Royal Palace", address: "Near Railway Station, Muzzafarnagar-251001", contact: "0131-2652222", propertyNo: "GH-MUZ-003", maintainedBy: "SMG Facilities Team", email: "royal.muz@smg.com" },
    { name: "Hotel Regency", address: "Delhi Road, Muzzafarnagar-251001", contact: "0131-2653333", propertyNo: "GH-MUZ-004", maintainedBy: "SMG Facilities Team", email: "regency.muz@smg.com" },
    { name: "Hotel Grand", address: "Hapur Road, Muzzafarnagar-251001", contact: "0131-2654444", propertyNo: "GH-MUZ-005", maintainedBy: "SMG Facilities Team", email: "grand.muz@smg.com" },
    { name: "Hotel City Heart", address: "Delhi Road, Muzzafarnagar-251001", contact: "0131-2655555", propertyNo: "GH-MUZ-006", maintainedBy: "SMG Facilities Team", email: "cityheart.muz@smg.com" },
    { name: "Hotel Sunshine", address: "Near Bus Stand, Muzzafarnagar-251001", contact: "0131-2656666", propertyNo: "GH-MUZ-007", maintainedBy: "SMG Facilities Team", email: "sunshine.muz@smg.com" },
    { name: "Hotel Diamond", address: "Railway Road, Muzzafarnagar-251001", contact: "0131-2657777", propertyNo: "GH-MUZ-008", maintainedBy: "SMG Facilities Team", email: "diamond.muz@smg.com" },
    { name: "Hotel Plaza", address: "Delhi Road, Muzzafarnagar-251001", contact: "0131-2658888", propertyNo: "GH-MUZ-009", maintainedBy: "SMG Facilities Team", email: "plaza.muz@smg.com" },
    { name: "Hotel Classic", address: "Hapur Road, Muzzafarnagar-251001", contact: "0131-2659999", propertyNo: "GH-MUZ-010", maintainedBy: "SMG Facilities Team", email: "classic.muz@smg.com" },
    { name: "Hotel Heritage", address: "Near Railway Station, Muzzafarnagar-251001", contact: "0131-2650000", propertyNo: "GH-MUZ-011", maintainedBy: "SMG Facilities Team", email: "heritage.muz@smg.com" },
    { name: "Hotel Elite", address: "Delhi Road, Muzzafarnagar-251001", contact: "0131-2651234", propertyNo: "GH-MUZ-012", maintainedBy: "SMG Facilities Team", email: "elite.muz@smg.com" },
    
    // RAIPUR
    { name: "Courtyard by Marriott", address: "Magneto The Mall, Devendra Nagar, Raipur-492001", contact: "0771-4044444", propertyNo: "GH-RAI-001", maintainedBy: "SMG Facilities Team", email: "courtyard.rai@smg.com" },
    { name: "Hyatt Raipur", address: "Magneto The Mall, Devendra Nagar, Raipur-492001", contact: "0771-4077777", propertyNo: "GH-RAI-002", maintainedBy: "SMG Facilities Team", email: "hyatt.rai@smg.com" },
    { name: "Sayaji Hotel", address: "Junction Boulevard, Near Magneto The Mall, Raipur-492001", contact: "0771-4700000", propertyNo: "GH-RAI-003", maintainedBy: "SMG Facilities Team", email: "sayaji.rai@smg.com" },
    { name: "Hotel Babylon Inn", address: "G.E. Road, Near Magneto The Mall, Raipur-492001", contact: "0771-4060000", propertyNo: "GH-RAI-004", maintainedBy: "SMG Facilities Team", email: "babylon.rai@smg.com" },
    { name: "Piccadily Hotel", address: "Civil Lines, Raipur-492001", contact: "0771-2534000", propertyNo: "GH-RAI-005", maintainedBy: "SMG Facilities Team", email: "piccadily.rai@smg.com" },
    { name: "Hotel Amar", address: "G.E. Road, Raipur-492001", contact: "0771-2222222", propertyNo: "GH-RAI-006", maintainedBy: "SMG Facilities Team", email: "amar.rai@smg.com" },
    { name: "Hotel Celebration", address: "Near Railway Station, Raipur-492001", contact: "0771-2333333", propertyNo: "GH-RAI-007", maintainedBy: "SMG Facilities Team", email: "celebration.rai@smg.com" },
    { name: "Hotel Regency", address: "Civil Lines, Raipur-492001", contact: "0771-2444444", propertyNo: "GH-RAI-008", maintainedBy: "SMG Facilities Team", email: "regency.rai@smg.com" },
    
    // NORTH GOA
    { name: "Taj Fort Aguada", address: "Candolim, Bardez, North Goa-403515", contact: "0832-6645858", propertyNo: "GH-GOA-001", maintainedBy: "SMG Facilities Team", email: "tajfort.goa@smg.com" },
    { name: "The Leela", address: "Mobor, Cavelossim, South Goa-403731", contact: "0832-6721234", propertyNo: "GH-GOA-002", maintainedBy: "SMG Facilities Team", email: "leela.goa@smg.com" },
    { name: "Hyatt Place", address: "Candolim, Bardez, North Goa-403515", contact: "0832-6719000", propertyNo: "GH-GOA-003", maintainedBy: "SMG Facilities Team", email: "hyatt.goa@smg.com" },
    { name: "Novotel Goa", address: "Candolim, Bardez, North Goa-403515", contact: "0832-6645858", propertyNo: "GH-GOA-004", maintainedBy: "SMG Facilities Team", email: "novotel.goa@smg.com" },
    { name: "Cidade de Goa", address: "Vainguinim Beach, Dona Paula, North Goa-403004", contact: "0832-2454545", propertyNo: "GH-GOA-005", maintainedBy: "SMG Facilities Team", email: "cidade.goa@smg.com" },
    { name: "ITC Grand Goa", address: "Arossim Beach, Cansaulim, South Goa-403712", contact: "0832-2723838", propertyNo: "GH-GOA-006", maintainedBy: "SMG Facilities Team", email: "itc.goa@smg.com" },
    { name: "Alila Diwa Goa", address: "Adao Waddo, Majorda, Salcete, South Goa-403713", contact: "0832-2746800", propertyNo: "GH-GOA-007", maintainedBy: "SMG Facilities Team", email: "alila.goa@smg.com" },
    { name: "Park Hyatt Goa", address: "Arossim Beach, Cansaulim, South Goa-403712", contact: "0832-6721234", propertyNo: "GH-GOA-008", maintainedBy: "SMG Facilities Team", email: "parkhyatt.goa@smg.com" },
    { name: "Hard Rock Hotel", address: "Calangute, Bardez, North Goa-403516", contact: "0832-6719000", propertyNo: "GH-GOA-009", maintainedBy: "SMG Facilities Team", email: "hardrock.goa@smg.com" },
    { name: "W Goa", address: "Vagator Beach, Bardez, North Goa-403509", contact: "0832-6719000", propertyNo: "GH-GOA-010", maintainedBy: "SMG Facilities Team", email: "w.goa@smg.com" },
    
    // AHMEDABAD
    { name: "Hotel Cama", address: "Khanpur, Ahmedabad-380001", contact: "079-25506281", propertyNo: "GH-AMD-001", maintainedBy: "SMG Facilities Team", email: "cama.amd@smg.com" },
    { name: "Lemon Tree Hotel", address: "Usmanpura, Ahmedabad-380013", contact: "079-66444444", propertyNo: "GH-AMD-002", maintainedBy: "SMG Facilities Team", email: "lemontree.amd@smg.com" },
    { name: "Hyatt Regency", address: "Off S.G. Highway, Ahmedabad-380015", contact: "079-66661234", propertyNo: "GH-AMD-003", maintainedBy: "SMG Facilities Team", email: "hyatt.amd@smg.com" },
    { name: "The Pride Hotel", address: "S.G. Highway, Ahmedabad-380054", contact: "079-26856666", propertyNo: "GH-AMD-004", maintainedBy: "SMG Facilities Team", email: "pride.amd@smg.com" },
    { name: "Radisson Blu", address: "Near Airport, S.G. Highway, Ahmedabad-380060", contact: "079-66770000", propertyNo: "GH-AMD-005", maintainedBy: "SMG Facilities Team", email: "radisson.amd@smg.com" },
    { name: "Fortune Landmark", address: "Usmanpura, Ashram Road, Ahmedabad-380013", contact: "079-27560444", propertyNo: "GH-AMD-006", maintainedBy: "SMG Facilities Team", email: "fortune.amd@smg.com" },
    { name: "Novotel Ahmedabad", address: "S.G. Highway, Ahmedabad-380054", contact: "079-66000888", propertyNo: "GH-AMD-007", maintainedBy: "SMG Facilities Team", email: "novotel.amd@smg.com" },
    { name: "Hotel Royal Highness", address: "Near Railway Station, Ahmedabad-380001", contact: "079-22141234", propertyNo: "GH-AMD-008", maintainedBy: "SMG Facilities Team", email: "royal.amd@smg.com" },
    { name: "The Gateway Hotel", address: "Airport Circle, Hansol, Ahmedabad-382475", contact: "079-66633366", propertyNo: "GH-AMD-009", maintainedBy: "SMG Facilities Team", email: "gateway.amd@smg.com" },
    { name: "Crowne Plaza", address: "City Center Mall, S.G. Highway, Ahmedabad-380015", contact: "079-66261234", propertyNo: "GH-AMD-010", maintainedBy: "SMG Facilities Team", email: "crowneplaza.amd@smg.com" },
    
    // RANCHI
    { name: "BNR Hotel", address: "Doranda, Ranchi-834002", contact: "0651-2480000", propertyNo: "GH-RAN-001", maintainedBy: "SMG Facilities Team", email: "bnr.ran@smg.com" },
    { name: "Hotel Yuvraj Palace", address: "Main Road, Ranchi-834001", contact: "0651-2331111", propertyNo: "GH-RAN-002", maintainedBy: "SMG Facilities Team", email: "yuvraj.ran@smg.com" },
    { name: "Radisson Blu", address: "Hinoo, Ranchi-834002", contact: "0651-6605000", propertyNo: "GH-RAN-003", maintainedBy: "SMG Facilities Team", email: "radisson.ran@smg.com" },
    { name: "Capitol Hill", address: "Circular Road, Ranchi-834001", contact: "0651-2331234", propertyNo: "GH-RAN-004", maintainedBy: "SMG Facilities Team", email: "capitol.ran@smg.com" },
    { name: "Le Lac Sarovar Portico", address: "Kanke Road, Ranchi-834008", contact: "0651-2570000", propertyNo: "GH-RAN-005", maintainedBy: "SMG Facilities Team", email: "lelac.ran@smg.com" },
    { name: "Hotel Arya Palace", address: "Main Road, Ranchi-834001", contact: "0651-2332222", propertyNo: "GH-RAN-006", maintainedBy: "SMG Facilities Team", email: "arya.ran@smg.com" },
    { name: "The Maple Grand", address: "Circular Road, Ranchi-834001", contact: "0651-2333333", propertyNo: "GH-RAN-007", maintainedBy: "SMG Facilities Team", email: "maple.ran@smg.com" },
    { name: "Hotel Embassy", address: "Main Road, Ranchi-834001", contact: "0651-2334444", propertyNo: "GH-RAN-008", maintainedBy: "SMG Facilities Team", email: "embassy.ran@smg.com" },
    { name: "Hotel Kwality Inn", address: "Station Road, Ranchi-834001", contact: "0651-2335555", propertyNo: "GH-RAN-009", maintainedBy: "SMG Facilities Team", email: "kwality.ran@smg.com" },
    { name: "Hotel Presidency", address: "Main Road, Ranchi-834001", contact: "0651-2336666", propertyNo: "GH-RAN-010", maintainedBy: "SMG Facilities Team", email: "presidency.ran@smg.com" },
    
    // BANGALORE
    { name: "The Oberoi", address: "37-39, M.G. Road, Bangalore-560001", contact: "080-25585858", propertyNo: "GH-BLR-001", maintainedBy: "SMG Facilities Team", email: "oberoi.blr@smg.com" },
    { name: "ITC Gardenia", address: "Residency Road, Bangalore-560025", contact: "080-42121212", propertyNo: "GH-BLR-002", maintainedBy: "SMG Facilities Team", email: "itc.blr@smg.com" },
    { name: "Taj West End", address: "Race Course Road, Bangalore-560001", contact: "080-66605660", propertyNo: "GH-BLR-003", maintainedBy: "SMG Facilities Team", email: "tajwest.blr@smg.com" },
    { name: "JW Marriott", address: "24/1, Vittal Mallya Road, Bangalore-560001", contact: "080-40450000", propertyNo: "GH-BLR-004", maintainedBy: "SMG Facilities Team", email: "jwmarriott.blr@smg.com" },
    { name: "The Leela Palace", address: "23, Old Airport Road, Bangalore-560008", contact: "080-25211234", propertyNo: "GH-BLR-005", maintainedBy: "SMG Facilities Team", email: "leela.blr@smg.com" },
    { name: "Radisson Blu", address: "66/1, Residency Road, Bangalore-560025", contact: "080-42424242", propertyNo: "GH-BLR-006", maintainedBy: "SMG Facilities Team", email: "radisson.blr@smg.com" },
    { name: "Sheraton Grand", address: "26/1, Dr. Rajkumar Road, Bangalore-560055", contact: "080-40555555", propertyNo: "GH-BLR-007", maintainedBy: "SMG Facilities Team", email: "sheraton.blr@smg.com" },
    { name: "The Park", address: "14/7, M.G. Road, Bangalore-560001", contact: "080-25594666", propertyNo: "GH-BLR-008", maintainedBy: "SMG Facilities Team", email: "park.blr@smg.com" },
    { name: "Vivanta by Taj", address: "41/3, M.G. Road, Bangalore-560001", contact: "080-66604444", propertyNo: "GH-BLR-009", maintainedBy: "SMG Facilities Team", email: "vivanta.blr@smg.com" },
    { name: "Novotel", address: "The Quad, Bagmane World Technology Center, Bangalore-560066", contact: "080-41775000", propertyNo: "GH-BLR-010", maintainedBy: "SMG Facilities Team", email: "novotel.blr@smg.com" },
    { name: "Hyatt Centric", address: "88/2, M.G. Road, Bangalore-560001", contact: "080-67001234", propertyNo: "GH-BLR-011", maintainedBy: "SMG Facilities Team", email: "hyattcentric.blr@smg.com" },
    { name: "Conrad Bangalore", address: "25/3, Kensington Road, Bangalore-560008", contact: "080-66001234", propertyNo: "GH-BLR-012", maintainedBy: "SMG Facilities Team", email: "conrad.blr@smg.com" },
    
    // PUNE
    { name: "JW Marriott", address: "Senapati Bapat Road, Pune-411053", contact: "020-66837777", propertyNo: "GH-PUN-001", maintainedBy: "SMG Facilities Team", email: "jwmarriott.pun@smg.com" },
    { name: "The Westin", address: "36/3-B, Koregaon Park Annexe, Pune-411001", contact: "020-66683333", propertyNo: "GH-PUN-002", maintainedBy: "SMG Facilities Team", email: "westin.pun@smg.com" },
    { name: "Conrad Pune", address: "7, Mangaldas Road, Pune-411001", contact: "020-66780000", propertyNo: "GH-PUN-003", maintainedBy: "SMG Facilities Team", email: "conrad.pun@smg.com" },
    { name: "Hyatt Regency", address: "Weikfield IT Park, Nagar Road, Pune-411014", contact: "020-66451234", propertyNo: "GH-PUN-004", maintainedBy: "SMG Facilities Team", email: "hyatt.pun@smg.com" },
    { name: "Radisson Blu", address: "Kharadi, Pune-411014", contact: "020-66660000", propertyNo: "GH-PUN-005", maintainedBy: "SMG Facilities Team", email: "radisson.pun@smg.com" },
    { name: "Novotel", address: "Nagar Road, Viman Nagar, Pune-411014", contact: "020-66743000", propertyNo: "GH-PUN-006", maintainedBy: "SMG Facilities Team", email: "novotel.pun@smg.com" },
    { name: "The Pride Hotel", address: "University Road, Pune-411005", contact: "020-66024444", propertyNo: "GH-PUN-007", maintainedBy: "SMG Facilities Team", email: "pride.pun@smg.com" },
    { name: "Courtyard by Marriott", address: "City Vista, Kharadi, Pune-411014", contact: "020-67723333", propertyNo: "GH-PUN-008", maintainedBy: "SMG Facilities Team", email: "courtyard.pun@smg.com" },
    { name: "Sheraton Grand", address: "Raja Bahadur Mill Road, Pune-411001", contact: "020-66403000", propertyNo: "GH-PUN-009", maintainedBy: "SMG Facilities Team", email: "sheraton.pun@smg.com" },
    { name: "Hotel Sagar Plaza", address: "East Street, Pune-411001", contact: "020-26052525", propertyNo: "GH-PUN-010", maintainedBy: "SMG Facilities Team", email: "sagar.pun@smg.com" },
    
    // BHOPAL
    { name: "Jehan Numa Palace", address: "157, Shamla Hills, Bhopal-462013", contact: "0755-2661100", propertyNo: "GH-BHO-001", maintainedBy: "SMG Facilities Team", email: "jehannuma.bho@smg.com" },
    { name: "Courtyard by Marriott", address: "Plot No. 5-A, Zone-1, M.P. Nagar, Bhopal-462011", contact: "0755-4663333", propertyNo: "GH-BHO-002", maintainedBy: "SMG Facilities Team", email: "courtyard.bho@smg.com" },
    { name: "Hotel Lake View Ashok", address: "Shamla Hills, Bhopal-462013", contact: "0755-2664006", propertyNo: "GH-BHO-003", maintainedBy: "SMG Facilities Team", email: "lakeview.bho@smg.com" },
    { name: "Jehan Numa Retreat", address: "Shamla Hills, Bhopal-462013", contact: "0755-2661100", propertyNo: "GH-BHO-004", maintainedBy: "SMG Facilities Team", email: "retreat.bho@smg.com" },
    { name: "Noor-Us-Sabah Palace", address: "VIP Road, Kolar, Bhopal-462042", contact: "0755-2466699", propertyNo: "GH-BHO-005", maintainedBy: "SMG Facilities Team", email: "noor.bho@smg.com" },
    { name: "Hotel Residency", address: "M.P. Nagar, Bhopal-462011", contact: "0755-2576777", propertyNo: "GH-BHO-006", maintainedBy: "SMG Facilities Team", email: "residency.bho@smg.com" },
    { name: "Hotel Palash Residency", address: "Kolar Road, Bhopal-462042", contact: "0755-2465555", propertyNo: "GH-BHO-007", maintainedBy: "SMG Facilities Team", email: "palash.bho@smg.com" },
    { name: "Sayaji Hotel", address: "Above Abhishek Plaza, Zone 2, M.P. Nagar, Bhopal-462011", contact: "0755-4700000", propertyNo: "GH-BHO-008", maintainedBy: "SMG Facilities Team", email: "sayaji.bho@smg.com" },
    { name: "Platinum Inn", address: "Maharana Pratap Nagar, Bhopal-462011", contact: "0755-2577777", propertyNo: "GH-BHO-009", maintainedBy: "SMG Facilities Team", email: "platinum.bho@smg.com" },
    { name: "Hotel Royal Palace", address: "Hamidia Road, Bhopal-462001", contact: "0755-2740000", propertyNo: "GH-BHO-010", maintainedBy: "SMG Facilities Team", email: "royal.bho@smg.com" },
    
    // CUTTACK
    { name: "Hotel Akbari International", address: "Link Road, Cuttack-753012", contact: "0671-2318888", propertyNo: "GH-CUT-001", maintainedBy: "SMG Facilities Team", email: "akbari.cut@smg.com" },
    { name: "Hotel Sangam", address: "Link Road, Cuttack-753012", contact: "0671-2314444", propertyNo: "GH-CUT-002", maintainedBy: "SMG Facilities Team", email: "sangam.cut@smg.com" },
    { name: "Hotel Ashoka", address: "Link Road, Cuttack-753012", contact: "0671-2315555", propertyNo: "GH-CUT-003", maintainedBy: "SMG Facilities Team", email: "ashoka.cut@smg.com" },
    { name: "Hotel Royal", address: "Badambadi, Cuttack-753009", contact: "0671-2322222", propertyNo: "GH-CUT-004", maintainedBy: "SMG Facilities Team", email: "royal.cut@smg.com" },
    { name: "Hotel Executive", address: "Link Road, Cuttack-753012", contact: "0671-2316666", propertyNo: "GH-CUT-005", maintainedBy: "SMG Facilities Team", email: "executive.cut@smg.com" },
    { name: "Hotel Grand Central", address: "Link Road, Cuttack-753012", contact: "0671-2317777", propertyNo: "GH-CUT-006", maintainedBy: "SMG Facilities Team", email: "grandcentral.cut@smg.com" },
    { name: "Hotel Sai International", address: "Badambadi, Cuttack-753009", contact: "0671-2323333", propertyNo: "GH-CUT-007", maintainedBy: "SMG Facilities Team", email: "sai.cut@smg.com" },
    { name: "Hotel Residency", address: "Link Road, Cuttack-753012", contact: "0671-2318888", propertyNo: "GH-CUT-008", maintainedBy: "SMG Facilities Team", email: "residency.cut@smg.com" },
    { name: "Hotel Park Inn", address: "Link Road, Cuttack-753012", contact: "0671-2319999", propertyNo: "GH-CUT-009", maintainedBy: "SMG Facilities Team", email: "parkinn.cut@smg.com" },
    
    // ALLAHABAD
    { name: "Hotel Milan Palace", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2426900", propertyNo: "GH-ALD-001", maintainedBy: "SMG Facilities Team", email: "milan.ald@smg.com" },
    { name: "Hotel Presidency", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2427000", propertyNo: "GH-ALD-002", maintainedBy: "SMG Facilities Team", email: "presidency.ald@smg.com" },
    { name: "Hotel Yatrik", address: "S.P. Marg, Civil Lines, Allahabad-211001", contact: "0532-2601234", propertyNo: "GH-ALD-003", maintainedBy: "SMG Facilities Team", email: "yatrik.ald@smg.com" },
    { name: "Hotel Harsh Residency", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2428888", propertyNo: "GH-ALD-004", maintainedBy: "SMG Facilities Team", email: "harsh.ald@smg.com" },
    { name: "Hotel Samrat", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2429999", propertyNo: "GH-ALD-005", maintainedBy: "SMG Facilities Team", email: "samrat.ald@smg.com" },
    { name: "Hotel Grand Continental", address: "Sardar Patel Marg, Civil Lines, Allahabad-211001", contact: "0532-2420000", propertyNo: "GH-ALD-006", maintainedBy: "SMG Facilities Team", email: "grandcont.ald@smg.com" },
    { name: "Hotel Polo Max", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2421111", propertyNo: "GH-ALD-007", maintainedBy: "SMG Facilities Team", email: "polo.ald@smg.com" },
    { name: "Hotel Rahi", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2422222", propertyNo: "GH-ALD-008", maintainedBy: "SMG Facilities Team", email: "rahi.ald@smg.com" },
    { name: "Hotel International", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2423333", propertyNo: "GH-ALD-009", maintainedBy: "SMG Facilities Team", email: "international.ald@smg.com" },
    { name: "Hotel Regency", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2424444", propertyNo: "GH-ALD-010", maintainedBy: "SMG Facilities Team", email: "regency.ald@smg.com" },
    { name: "Hotel Kanha Shyam", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2425555", propertyNo: "GH-ALD-011", maintainedBy: "SMG Facilities Team", email: "kanha.ald@smg.com" },
    { name: "Hotel Sagar Ratna", address: "M.G. Marg, Civil Lines, Allahabad-211001", contact: "0532-2426666", propertyNo: "GH-ALD-012", maintainedBy: "SMG Facilities Team", email: "sagar.ald@smg.com" },
    
    // KOLKATA
    { name: "The Oberoi Grand", address: "15, Jawaharlal Nehru Road, Kolkata-700013", contact: "033-22492323", propertyNo: "GH-KOL-001", maintainedBy: "SMG Facilities Team", email: "oberoi.kol@smg.com" },
    { name: "ITC Sonar", address: "JBS Haldane Avenue, Kolkata-700046", contact: "033-23456789", propertyNo: "GH-KOL-002", maintainedBy: "SMG Facilities Team", email: "itc.kol@smg.com" },
    { name: "Taj Bengal", address: "34-B, Belvedere Road, Alipore, Kolkata-700027", contact: "033-66123939", propertyNo: "GH-KOL-003", maintainedBy: "SMG Facilities Team", email: "taj.kol@smg.com" },
    { name: "The Park", address: "17, Park Street, Kolkata-700016", contact: "033-22497336", propertyNo: "GH-KOL-004", maintainedBy: "SMG Facilities Team", email: "park.kol@smg.com" },
    { name: "JW Marriott", address: "4A, J.B.S. Haldane Avenue, Kolkata-700105", contact: "033-66339999", propertyNo: "GH-KOL-005", maintainedBy: "SMG Facilities Team", email: "jwmarriott.kol@smg.com" },
    { name: "Hyatt Regency", address: "JA-1, Sector-3, Salt Lake City, Kolkata-700098", contact: "033-66761234", propertyNo: "GH-KOL-006", maintainedBy: "SMG Facilities Team", email: "hyatt.kol@smg.com" },
    { name: "Novotel", address: "CF-14, Action Area 1C, New Town, Kolkata-700156", contact: "033-66183333", propertyNo: "GH-KOL-007", maintainedBy: "SMG Facilities Team", email: "novotel.kol@smg.com" },
    { name: "Swissotel", address: "City Center, New Town, Kolkata-700156", contact: "033-66173333", propertyNo: "GH-KOL-008", maintainedBy: "SMG Facilities Team", email: "swissotel.kol@smg.com" },
    { name: "Peerless Inn", address: "12, Jawaharlal Nehru Road, Kolkata-700013", contact: "033-22298989", propertyNo: "GH-KOL-009", maintainedBy: "SMG Facilities Team", email: "peerless.kol@smg.com" },
    { name: "The Lalit Great Eastern", address: "1 & 2, Old Court House Street, Kolkata-700069", contact: "033-44445555", propertyNo: "GH-KOL-010", maintainedBy: "SMG Facilities Team", email: "lalit.kol@smg.com" },
    { name: "Hotel Hindustan International", address: "235/1, A.J.C. Bose Road, Kolkata-700020", contact: "033-22833030", propertyNo: "GH-KOL-011", maintainedBy: "SMG Facilities Team", email: "hindustan.kol@smg.com" },
    { name: "The Golden Park", address: "54 & 55, J.L. Nehru Road, Kolkata-700071", contact: "033-22899000", propertyNo: "GH-KOL-012", maintainedBy: "SMG Facilities Team", email: "golden.kol@smg.com" },
    { name: "Fairfield by Marriott", address: "Street No. 229, Action Area 2B, New Town, Kolkata-700156", contact: "033-66700000", propertyNo: "GH-KOL-013", maintainedBy: "SMG Facilities Team", email: "fairfield.kol@smg.com" },
    { name: "The Kenilworth", address: "1 & 2, Little Russell Street, Kolkata-700071", contact: "033-22825121", propertyNo: "GH-KOL-014", maintainedBy: "SMG Facilities Team", email: "kenilworth.kol@smg.com" },
    { name: "The Corner Courtyard", address: "1A, Elgin Road, Kolkata-700020", contact: "033-40069777", propertyNo: "GH-KOL-015", maintainedBy: "SMG Facilities Team", email: "corner.kol@smg.com" },
  ];

  // Filter guest houses based on search query
  const filteredGuestHouses = allGuestHouses.filter(gh =>
    gh.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gh.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gh.propertyNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    gh.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination
  const totalPages = Math.ceil(filteredGuestHouses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentGuestHouses = filteredGuestHouses.slice(startIndex, endIndex);

  // Reset to page 1 when search query changes
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-[#1B254B] flex items-center gap-3">
          <Home className="text-teal-500" size={36} />
          SMG Guest House Directory
        </h1>
        <div className="text-sm text-gray-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200">
          <span className="font-semibold text-teal-600">{filteredGuestHouses.length}</span> Properties
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search by name, address, property number, or email..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-teal-500 focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Guest House List */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold">S.No</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Guest House Name</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Address</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Property Number</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Maintained By</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Contact Number</th>
                <th className="px-6 py-4 text-left text-sm font-bold">Email</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {currentGuestHouses.map((gh, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm text-gray-600">{startIndex + index + 1}</td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-[#1B254B]">{gh.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">{gh.address}</td>
                  <td className="px-6 py-4">
                    <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-xs font-semibold">
                      {gh.propertyNo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{gh.maintainedBy}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{gh.contact}</td>
                  <td className="px-6 py-4">
                    <a href={`mailto:${gh.email}`} className="text-blue-600 hover:text-blue-800 text-sm hover:underline">
                      {gh.email}
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 bg-gray-50 px-6 py-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredGuestHouses.length)} of {filteredGuestHouses.length} properties
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={20} />
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      currentPage === page
                        ? 'bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white shadow-md'
                        : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-300 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Empty State */}
      {filteredGuestHouses.length === 0 && (
        <div className="bg-white rounded-2xl p-12 text-center">
          <Home className="mx-auto text-gray-300 mb-4" size={64} />
          <h3 className="text-xl font-bold text-gray-600 mb-2">No Guest Houses Found</h3>
          <p className="text-gray-500">Try adjusting your search query</p>
        </div>
      )}
    </div>
  );
};
