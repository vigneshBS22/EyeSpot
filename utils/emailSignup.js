{
  user === undefined || user.length === 0
    ? item.average_rating
    : (+item.average_rating + user[0].rating) / (+item.total_ratings + 1);
}
