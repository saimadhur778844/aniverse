import {
  getCustomers as getCustomersService,
  getCustomerById as getCustomerByIdService,
} from "../services/customerService.js";

/*
|--------------------------------------------------------------------------
| Get Customers
|--------------------------------------------------------------------------
*/

export const getCustomers = async (
  req,
  res,
  next
) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
    } = req.query;

    const result =
      await getCustomersService({
        page: Number(page),
        limit: Number(limit),
        search,
      });

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

/*
|--------------------------------------------------------------------------
| Get Customer By ID
|--------------------------------------------------------------------------
*/

export const getCustomerById = async (
  req,
  res,
  next
) => {
  try {
    const customer =
      await getCustomerByIdService(
        req.params.id
      );

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    next(error);
  }
};