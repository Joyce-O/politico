import offices from '../dummyData/offices';

export default class OfficeController {
  static createOffice(request, response) {
    const dupName = offices.find(office => office.name === request.body.name);

    if (dupName) {
      response.status(409)
        .json({
          status: 409,
          error: 'name already exist'
        });
      return false;
    }

    const newOffice = {
      id: offices.length,
      name: request.body.name,
      type: request.body.type
    };

    offices.push(newOffice);
    return response.status(201)
      .json({
        status: 201,
        data: newOffice,
      });
  }

  static getAllOffices(request, response) {
    if (offices.length < 1 || offices === undefined) {
      response.status(404)
        .json({
          status: 404,
          error: 'No registered office yet.'
        });
    } else {
      return response.status(200)
        .json({
          status: 200,
          data: offices
        });
    }
  }

  static getAnOffice(request, response) {
    const { officeId } = request.params;
    if (!Number(officeId) || !/^[0-9]+$/.test(officeId)) {
      return response.status(400)
        .json({
          status: 400,
          error: 'Invalid officeId'
        });
    }
    const office = offices.find(obj => obj.id === Number(officeId));
    if (!office) {
      response.status(404)
        .json({
          status: 404,
          error: 'office does not exist',
        });
      return false;
    }
    return response.status(200)
      .json({
        status: 200,
        data: office
      });
  }
}
