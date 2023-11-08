const Ticket = require('./model');
const AppError = require('../../helpers/appError');


class TicketServices {

  static async create(Data,id) {
    const { balance,noOfTickets} = Data;

    let total=balance*noOfTickets

    const ticket = await Ticket.create({
      userId:id,
      balance,
      noOfTickets,
      total
    });

    return {ticket}
  }
    
  static async getAll() {
    let tickets =await Ticket.find().sort({ createdAt: -1 });
    return { tickets };
  }

  static async getSingle(id, next) {
    const ticket = await Ticket.findOne({_id:id});

    if (!ticket){
      return next(new AppError(`Ticket not found`, 404));
    }

    return { ticket };
  }

  static async Update(_id, body, next) {

    const updatedTicket = await Ticket.findByIdAndUpdate(
      _id,
      { ...body },
      {
        runValidators: true,
        new: true,
      }
    );

    if (!updatedTicket)
      return next(new AppError(`Can't find any card`, 404));

    return { updatedTicket };
  }

  static async Delete(_id, next) {
    const deletedTicket = await Ticket.findByIdAndDelete(_id);

    if (!deletedTicket)
      return next(new AppError(`No Ticket found against id ${_id}`, 404));

    return { deletedTicket };
  }


}

module.exports = TicketServices;
