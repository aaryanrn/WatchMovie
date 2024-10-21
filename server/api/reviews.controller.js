import ReviewsDAO from "../dao/reviewsDAO.js"
//import { ObjectId } from 'mongodb';

export default class ReviewsController {
  static async apiPostReview(req, res, next) {
    try {
      const movieId = parseInt(req.body.movieId)
      const review = req.body.review
      const user = req.body.user
      console.log('movieid', movieId)
      const reviewResponse = await ReviewsDAO.addReview(
        movieId,
        user,
        review
      )
      res.json({ status: "success" })
    } catch (e) {
      res.status(500).json({ error: e.message })
    }
  }

  static async apiGetReview(req, res, next) {
    try {
      let id = parseInt(req.params.id) || {}
      let review = await ReviewsDAO.getReview(id)
      if (!review) {
        res.status(404).json({ error: "Not found" })
        return
      }
      res.json(review)
    } catch (e) {
      console.log(`api, ${e}`)
      res.status(500).json({ error: e })
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = parseInt(req.params.id); // Use new here
      const review = req.body.review;
      const user = req.body.user;

      const reviewResponse = await ReviewsDAO.updateReview(
        reviewId,
        user,
        review
      );

      if (reviewResponse.error) {
        res.status(400).json({ error: reviewResponse.error });
        return;
      }

      if (reviewResponse.modifiedCount === 0) {
        throw new Error("Unable to update review");
      }

      res.json({ status: "success" });
    } catch (e) {
      console.error("Error updating review:", e);
      res.status(500).json({ error: e.message });
    }
  }


  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = parseInt(req.params.id); // Use new here as well
      const reviewResponse = await ReviewsDAO.deleteReview(reviewId);
      res.json({ status: "success" });
    } catch (e) {
      console.error("Error deleting review:", e);
      res.status(500).json({ error: e.message });
    }
  }
  static async apiGetReviews(req, res, next) {
    try {
        let id = parseInt(req.params.id, 10) || {}; // Parse movieId as integer
        let reviews = await ReviewsDAO.getReviewsByMovieId(id);
        if (!reviews) {
            res.status(404).json({ error: "Not found" });
            return;
        }
        res.json(reviews);
    } catch (e) {
        console.log(`api, ${e}`);
        res.status(500).json({ error: e });
    }
}

}