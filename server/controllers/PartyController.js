import cloudinary from 'cloudinary';
import pool from '../database/dbConnection';

import {
  queryPartiesByName, insertParty, selectAllParties, selectAParty, updatePartyName, deleteParty,
} from '../database/queries';

import BufferStream from '../utilities.js/imgBufffer';


export default class PartyController {
  static createParty(request, response) {
    const {
      name, acronym, slogan, hqAddress, email, phone,
    } = request.body;

    const image = {};
    let stream;
    if (request.file !== undefined) {
      stream = new BufferStream(request.file.buffer);
    }
    stream.pipe(cloudinary.uploader.upload_stream((result) => {
      if (result !== undefined) {
        image.url = result.url;
        image.id = result.public_id;
      }
    }));

    setTimeout(() => {
      const logoUrl = image;
      if (JSON.stringify(logoUrl) === '{}') {
        response.status(400)
          .json({
            status: 400,
            error: 'Logo image upload failed, try again.',
          });
        return false;
      }
      const values = [
        name,
        acronym,
        slogan,
        hqAddress,
        logoUrl,
        email,
        phone,
      ];

      pool.query(insertParty, values)
        .then((data) => {
          if (data.rowCount !== 0) {
            const { id, createdOn } = data.rows[0];
            const party = {
              id, name, acronym, slogan, hqAddress, email, phone, createdOn,
            };

            return response.status(201)
              .json({
                status: 201,
                data: party,

              });
          }
        })
        .catch(error => response.status(500)
          .json({
            status: 400,
            error: 'Your input is not valid, check and try again',
          }));
    }, 10000);
  }

  static getAllParties(request, response) {
    pool.query(selectAllParties)
      .then((data) => {
        if (data.rowCount === 0) {
          return response.status(404)
            .json({
              status: 404,
              error: 'No registered party yet',

            });
        }
        const partyList = data.rows;
        return response.status(200)
          .json({
            status: 200,
            data: partyList,
          });
      })
      .catch(error => response.status(400)
        .json({
          status: 400,
          error: 'Your input is not valid, check and try again',
        }));
  }

  static getOneParty(request, response) {
    const { partyId } = request.params;
    if (!/[0-9]+$/.test(partyId)) {
      return response
        .json({
          status: 400,
          error: 'Invalid party id number, please check and try again',
        });
    }
    pool.query(selectAParty, [partyId])
      .then((data) => {
        if (data.rowCount === 0) {
          response.status(404)
            .json({
              status: 404,
              error: 'party does not exist',
            });
          return false;
        }
        const party = data.rows;
        return response.status(200)
          .json({
            status: 200,
            data: party,
          });
      })
      .catch(error => response.status(400)
        .json({
          status: 400,
          error: 'Your input is not valid, check and try again',
        }));
  }

  static editParty(request, response) {
    const { partyId } = request.params;
    const { name } = request.body;
    if (!/[0-9]+$/.test(partyId)) {
      return response
        .json({
          status: 400,
          error: 'Invalid party id number, check the number and try again',
        });
    }
    pool.query(selectAParty, [partyId])
      .then((data) => {
        if (data.rowCount === 0) {
          response.status(404)
            .json({
              status: 404,
              error: 'Party does not exist',
            });
          return false;
        }
      });
    pool.query(queryPartiesByName, [name])
      .then((data) => {
        if (data.rowCount !== 0) {
          response.status(400)
            .json({
              status: 400,
              error: 'Name already exist',
            });
          return false;
        }
      });
    pool.query(updatePartyName, [name, partyId])
      .then((result) => {
        const party = result.rows;
        return response.status(200)
          .json({
            status: 200,
            data: party,
          });
        // .catch(error => response.status(400)
        //   .json({
        //     status: 400,
        //     error: 'Your input is not valid, check and try again',
        //   }));
      });
  }

  static deleteParty(request, response) {
    const { partyId } = request.params;
    if (!/[0-9]+$/.test(partyId)) {
      response
        .json({
          status: 400,
          error: 'Invalid party Id check and try again',
        });
      return false;
    }
    pool.query(selectAParty, [partyId])
      .then((data) => {
        if (data.rowCount === 0) {
          response.status(404)
            .json({
              status: 404,
              error: 'Party does not exist',
            });
          return false;
        }
      });
    pool.query(deleteParty, [partyId])
      .then(data => response.status(200)
        .json({
          status: 200,
          message: 'This order is deleted',
        }))
      .catch(error => response.status(400)
        .json({
          status: 400,
          error: 'our input is not valid, check and try again',
        }));
  }
}
