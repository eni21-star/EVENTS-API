import express from 'express'
import AuthController from '../controllers/auth'
import EventController from '../controllers/events.js';
import verifyJwt from '../middleware/jwtHandler';
import ReviewController from '../controllers/reviews';
import UserController from '../controllers/user';


const router = express.Router()
const eventController = new EventController();
const reviewController = new ReviewController()
const userController = new UserController();

//Route for Register
router.post('/register', (req, res, next)=>{
   new AuthController().RegisterController(req, res, next)
})

//Route for Login
router.post('/login', (req, res, next)=>{
    new AuthController().LoginController(req, res, next)
 })
 
// Route for creating a new event
router.post('/new-event', verifyJwt, (req, res, next) => {
    eventController.newEventController(req, res, next);
});

// Route for getting all events
router.get('/events', (req, res, next) => {
    eventController.getAllEventsController(req, res, next);
});

// Route for getting an event by ID
router.get('/event-id',  (req, res, next) => {
    eventController.getEventByIdController(req, res, next);
});

// Route for getting an event by title
router.get('/event-title', (req, res, next) => {
    eventController.getEventByTitleController(req, res, next);
});

// Route for getting events by keyword
router.get('/event-keyword', (req, res, next) => {
    eventController.gethEventsByKeywordController(req, res, next);
});

// Route for updating an event
router.put('/event-update', verifyJwt, (req, res, next) => {
    eventController.updateEventsController(req, res, next);
});

// Route for requesting to attend an event
router.post('/event/request-to-attend', verifyJwt, (req, res, next) => {
    eventController.reqtoAttendEventController(req, res, next);
});

// Route for inviting a user to attend an event
router.post('/event/invite', verifyJwt, (req, res, next) => {
    eventController.inviteUserAttendEventController(req, res, next);
});

// Route for accepting a user's request to attend an event
router.post('/event/accept-request', verifyJwt, (req, res, next) => {
    eventController.acceptUserRequestEventController(req, res, next);
});

// Route for accepting an event invite
router.post('/event/accept-invite', verifyJwt, (req, res, next) => {
    eventController.acceptEventInviteController(req, res, next);
});

//Route for creating a review
router.post("/review/new", verifyJwt, (req, res, next) => {
    reviewController.newReviewController(req, res, next);
});

// Route for deleting a review
router.delete("/review/delete", verifyJwt, (req, res, next) => {
    reviewController.deleteReviewController(req, res, next);
});

// Route for getting user attended events
router.get("/user/attended-events", verifyJwt, (req, res, next) => {
    userController.getUserAttendedEventsController(req, res, next);
});

// Route for getting user invited events
router.get("/user/invited-events", verifyJwt, (req, res, next) => {
    userController.getUserInvitedEventsController(req, res, next);
});

// Route for downloading event data
router.get("/user/download-event-data", (req, res, next) => {
    userController.downloadEventDataController(req, res, next);
});

export default router