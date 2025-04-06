import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import EventDatasource from '../datasource/events';
import { Iuser } from '../validators/authValidator';
import UserDataSource from '../datasource/user';
import { ForbiddenError, NotFoundError } from '../errorHandlers /errors';
import { get } from 'http';


class UserService extends UserDataSource {


  async getUserAttendedEventsService(user: Iuser){

    try {
      const { id } = user
      const findEvents = await this.getUserAttendedEvents(id) 
      return findEvents[0].eventsAttended
      
    } catch (error) {
      throw error
    }
  }

  async getUserIinvitedEventsService(user: Iuser){

    try {
      const { id } = user
      const findEvents = await this.getUserInvitedEvents(id) 
      return findEvents[0].eventsAttended
      
    } catch (error) {
      throw error
    }
  }

  async downloadEventDataService(eventId: string){
    try {
     
      const getEvent = await new EventDatasource().getEventById(eventId)
      if(!getEvent) throw new NotFoundError('event does not exist')

      const pdfDoc = await PDFDocument.create();
      const page = pdfDoc.addPage([595, 842]); // A4 size
      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
      const fontSize = 16;
    
      const { width, height } = page.getSize();
      const wrappedDescription = wrapText(getEvent.description, 60);
      const lines = [
        `Title: ${getEvent.title}`,
        ...wrappedDescription.map((line, i) =>
          i === 0 ? `Description: ${line}` : `           ${line}`
        ),
        `Location: ${getEvent.location}`,
        `Date & Time: ${new Date(getEvent.eventTime).toLocaleString()}`,
        `Host: ${getEvent.createdBy.username}`
      ];
    
      let y = (height + lines.length * (fontSize + 10)) / 2;
    
      for (const line of lines) {
        const textWidth = font.widthOfTextAtSize(line, fontSize);
        const x = (width - textWidth) / 2;
        page.drawText(line, { x, y, size: fontSize, font, color: rgb(0, 0, 0) });
        y -= fontSize + 10;
      }
    
      const pdfBytes = await pdfDoc.save();
      return {pdfBytes, title: getEvent.title}
    } catch (error) {
      throw error
    }

  }



}


function wrapText(text: string, maxCharsPerLine: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    if ((currentLine + word).length > maxCharsPerLine) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine += word + ' ';
    }
  }

  if (currentLine.trim()) {
    lines.push(currentLine.trim());
  }

  return lines;
}




export default UserService;
