import Partner from '../models/partner';

// for creating a new partner
// Controller for creating a new partner
export const createPartner = async (req, res) => {
  try {
    const { id, name, current_booking } = req.body;
    const partner = await Partner.create({ id, name, current_booking });
    res.json({ message: 'partner created successfully', partner });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


// getting all partners
export const getAllPartners = async (req, res) => {
    try {
      const partners = await Partner.findAll();
      res.json(partners);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };


  // Controller for getting a partner by ID
export const getPartnerById = async (req, res) => {
    try {
      const partnerId = req.params.id;
      const partner = await Partner.findByPk(partnerId);
      if (!partner) {
        res.status(404).send('partner not found');
      } else {
        res.json(partner);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  
  // updating a partner
export const updatePartnerById = async (req, res) => {
    try {
      const partnerId = req.params.id;
      const { id, name, current_booking } = req.body;
      const partner = await Partner.findByPk(partnerId);
      if (!partner) {
        res.status(404).send('partner not found');
      } else {
        
        partner.id = id,
        partner.name = name,
        partner.current_booking = current_booking,

        await partner.save();
        res.json({ message: 'partner updated successfully', partner });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
  
  // deleting a user by ID
  export const deletePartnerById = async (req, res) => {
    try {
      const partnerId = req.params.id;
      const partner = await Partner.findByPk(partnerId);
      if (!partner) {
        res.status(404).send('partner not found');
      } else {
        await partner.destroy();
        res.send('partner deleted successfully');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };