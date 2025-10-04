import emailjs from '@emailjs/browser';

interface FormData {
  companyName: string;
  contactPersonName: string;
  contactNumber: string;
  emailAddress: string;
  pickupLocation: string;
  dropLocation: string;
  natureOfGoods: string;
  weight: string;
  typeOfPacking: string;
  typeOfLoad: string;
  dimensions: string;
}

export const sendEmailWithEmailJS = async (formData: FormData) => {
  try {
    // EmailJS configuration - you'll need to set up an account at emailjs.com
    const serviceId = 'YOUR_SERVICE_ID'; // Replace with your EmailJS service ID
    const templateId = 'YOUR_TEMPLATE_ID'; // Replace with your EmailJS template ID
    const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your EmailJS public key

    const templateParams = {
      to_email: 'shubham16394@gmail.com',
      from_name: formData.contactPersonName,
      from_email: formData.emailAddress,
      company_name: formData.companyName,
      contact_number: formData.contactNumber,
      pickup_location: formData.pickupLocation,
      drop_location: formData.dropLocation,
      nature_of_goods: formData.natureOfGoods,
      weight: formData.weight,
      type_of_packing: formData.typeOfPacking,
      type_of_load: formData.typeOfLoad,
      dimensions: formData.dimensions,
      submitted_date: new Date().toLocaleString(),
    };

    const response = await emailjs.send(
      serviceId,
      templateId,
      templateParams,
      publicKey
    );

    return { success: true, response };
  } catch (error) {
    console.error('EmailJS error:', error);
    return { success: false, error };
  }
};
