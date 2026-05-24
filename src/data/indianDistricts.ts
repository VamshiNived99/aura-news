// Curated list of Indian states and their major districts.
// Used by the Local "Near Me" picker. Not exhaustive — covers the
// most populous / most-news-relevant districts per state.

export interface StateInfo {
  name: string;
  language: string; // default reading language for the state
  districts: string[];
}

export const INDIAN_STATES: StateInfo[] = [
  { name: "Andhra Pradesh", language: "te", districts: ["Visakhapatnam","Vijayawada","Guntur","Tirupati","Nellore","Kurnool","Kadapa","Anantapur","Rajahmundry","Kakinada","Eluru","Ongole","Chittoor","Srikakulam","Vizianagaram"] },
  { name: "Arunachal Pradesh", language: "hi", districts: ["Itanagar","Tawang","Pasighat","Naharlagun","Ziro","Bomdila"] },
  { name: "Assam", language: "hi", districts: ["Guwahati","Dibrugarh","Silchar","Jorhat","Tezpur","Nagaon","Tinsukia","Karimganj"] },
  { name: "Bihar", language: "hi", districts: ["Patna","Gaya","Bhagalpur","Muzaffarpur","Darbhanga","Purnia","Begusarai","Ara","Chhapra","Bihar Sharif","Katihar","Munger"] },
  { name: "Chhattisgarh", language: "hi", districts: ["Raipur","Bhilai","Bilaspur","Korba","Durg","Rajnandgaon","Jagdalpur","Ambikapur"] },
  { name: "Delhi", language: "hi", districts: ["New Delhi","South Delhi","North Delhi","East Delhi","West Delhi","Central Delhi","Dwarka","Rohini","Saket"] },
  { name: "Goa", language: "hi", districts: ["Panaji","Margao","Vasco da Gama","Mapusa","Ponda"] },
  { name: "Gujarat", language: "gu", districts: ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Gandhinagar","Junagadh","Anand","Bharuch","Mehsana","Nadiad"] },
  { name: "Haryana", language: "hi", districts: ["Gurugram","Faridabad","Panipat","Ambala","Hisar","Karnal","Rohtak","Sonipat","Yamunanagar","Panchkula","Bhiwani"] },
  { name: "Himachal Pradesh", language: "hi", districts: ["Shimla","Dharamshala","Mandi","Solan","Kullu","Manali","Hamirpur","Una","Bilaspur"] },
  { name: "Jharkhand", language: "hi", districts: ["Ranchi","Jamshedpur","Dhanbad","Bokaro","Hazaribagh","Deoghar","Giridih","Ramgarh"] },
  { name: "Karnataka", language: "kn", districts: ["Bengaluru","Mysuru","Mangaluru","Hubli","Belgaum","Davangere","Ballari","Tumkur","Shimoga","Bijapur","Gulbarga","Udupi"] },
  { name: "Kerala", language: "ml", districts: ["Thiruvananthapuram","Kochi","Kozhikode","Thrissur","Kollam","Alappuzha","Palakkad","Malappuram","Kannur","Kottayam","Pathanamthitta","Idukki"] },
  { name: "Madhya Pradesh", language: "hi", districts: ["Bhopal","Indore","Jabalpur","Gwalior","Ujjain","Sagar","Dewas","Satna","Ratlam","Rewa","Singrauli"] },
  { name: "Maharashtra", language: "mr", districts: ["Mumbai","Pune","Nagpur","Nashik","Aurangabad","Thane","Solapur","Kolhapur","Amravati","Navi Mumbai","Sangli","Jalgaon","Akola","Latur","Ahmednagar","Ratnagiri"] },
  { name: "Manipur", language: "hi", districts: ["Imphal","Thoubal","Bishnupur","Churachandpur"] },
  { name: "Meghalaya", language: "hi", districts: ["Shillong","Tura","Jowai","Nongstoin"] },
  { name: "Mizoram", language: "hi", districts: ["Aizawl","Lunglei","Champhai","Serchhip"] },
  { name: "Nagaland", language: "hi", districts: ["Kohima","Dimapur","Mokokchung","Tuensang"] },
  { name: "Odisha", language: "hi", districts: ["Bhubaneswar","Cuttack","Rourkela","Berhampur","Sambalpur","Puri","Balasore","Bhadrak"] },
  { name: "Punjab", language: "hi", districts: ["Ludhiana","Amritsar","Jalandhar","Patiala","Bathinda","Mohali","Pathankot","Hoshiarpur","Moga","Ferozepur"] },
  { name: "Rajasthan", language: "hi", districts: ["Jaipur","Jodhpur","Udaipur","Kota","Bikaner","Ajmer","Bhilwara","Alwar","Sikar","Pali","Sri Ganganagar"] },
  { name: "Sikkim", language: "hi", districts: ["Gangtok","Namchi","Mangan","Gyalshing"] },
  { name: "Tamil Nadu", language: "ta", districts: ["Chennai","Coimbatore","Madurai","Tiruchirappalli","Salem","Tirunelveli","Erode","Vellore","Thoothukudi","Dindigul","Thanjavur","Kanchipuram","Hosur"] },
  { name: "Telangana", language: "te", districts: ["Hyderabad","Warangal","Nizamabad","Karimnagar","Khammam","Mahbubnagar","Adilabad","Nalgonda","Rangareddy","Medak","Suryapet","Siddipet"] },
  { name: "Tripura", language: "bn", districts: ["Agartala","Udaipur","Dharmanagar","Kailashahar"] },
  { name: "Uttar Pradesh", language: "hi", districts: ["Lucknow","Kanpur","Ghaziabad","Agra","Varanasi","Meerut","Prayagraj","Noida","Bareilly","Aligarh","Moradabad","Saharanpur","Gorakhpur","Jhansi","Mathura","Ayodhya"] },
  { name: "Uttarakhand", language: "hi", districts: ["Dehradun","Haridwar","Roorkee","Haldwani","Rudrapur","Rishikesh","Nainital","Kashipur"] },
  { name: "West Bengal", language: "bn", districts: ["Kolkata","Howrah","Durgapur","Asansol","Siliguri","Darjeeling","Malda","Bardhaman","Kharagpur"] },
  { name: "Jammu and Kashmir", language: "hi", districts: ["Srinagar","Jammu","Anantnag","Baramulla","Udhampur","Kathua"] },
  { name: "Ladakh", language: "hi", districts: ["Leh","Kargil"] },
  { name: "Chandigarh", language: "hi", districts: ["Chandigarh"] },
  { name: "Puducherry", language: "ta", districts: ["Puducherry","Karaikal","Yanam","Mahe"] },
  { name: "Andaman and Nicobar Islands", language: "hi", districts: ["Port Blair","Car Nicobar"] },
  { name: "Dadra and Nagar Haveli and Daman and Diu", language: "gu", districts: ["Daman","Silvassa","Diu"] },
  { name: "Lakshadweep", language: "ml", districts: ["Kavaratti"] },
];

export function findStateForDistrict(district: string): StateInfo | undefined {
  if (!district) return undefined;
  const d = district.toLowerCase();
  return INDIAN_STATES.find(s => s.districts.some(x => x.toLowerCase() === d || x.toLowerCase().includes(d) || d.includes(x.toLowerCase())));
}

export function findStateByName(name: string): StateInfo | undefined {
  if (!name) return undefined;
  const n = name.toLowerCase();
  return INDIAN_STATES.find(s => s.name.toLowerCase() === n || n.includes(s.name.toLowerCase()));
}