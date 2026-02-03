# Railway Deployment Guide

## Prerequisites
- Railway account (railway.app)
- This repository

## Deployment Steps

### 1. Backend Deployment (Node.js API)

1. **Create a new project on Railway**
   - Go to railway.app
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your repository

2. **Add MySQL Database**
   - In your Railway project, click "+ New" → "Database"
   - Choose "MySQL"
   - Railway will automatically provide a `DATABASE_URL` environment variable

3. **Configure Environment Variables**
   ```bash
   # Railway will automatically set DATABASE_URL
   # Add these additional variables:
   PORT=3001
   NODE_ENV=production
   FRONTEND_URL=https://your-frontend-url.railway.app
   ALLOWED_ORIGINS=https://your-frontend-url.railway.app
   ```

4. **Deploy**
   - Railway will automatically deploy when you push to your repository
   - The `railway.json` file configures the build and deployment

### 2. Frontend Deployment (React)

1. **Create separate Railway project for frontend**
2. **Set environment variable:**
   ```bash
   REACT_APP_API_URL=https://your-backend-url.railway.app
   ```
3. **Deploy using build command:**
   ```bash
   npm run build
   ```

## Database Migration

After deployment, run database migration:

```bash
# Via Railway CLI or console
railway run npm run migrate
```

Or manually trigger the sync in your Railway deployment settings.

## Health Check

The application includes a health check endpoint at:
`/api/health`

Railway uses this to monitor your application's status.

## Troubleshooting

### Common Issues:

1. **Database Connection Failed**
   - Ensure `DATABASE_URL` is set by Railway
   - Check if MySQL addon is properly connected

2. **CORS Errors**
   - Verify `FRONTEND_URL` and `ALLOWED_ORIGINS` match your frontend URL
   - Check if your frontend is using HTTPS in production

3. **Environment Variables Not Loading**
   - Check Railway project variables section
   - Ensure variables are not prefixed with `REACT_APP_` for backend

4. **Build Failures**
   - Check build logs in Railway dashboard
   - Ensure all dependencies are in package.json

## Production Best Practices

1. **Security:**
   - Never commit `.env` files
   - Use Railway's environment variables for secrets
   - Enable SSL/HTTPS

2. **Performance:**
   - Use connection pooling (configured in db.js)
   - Monitor Railway metrics
   - Set appropriate timeouts

3. **Monitoring:**
   - Check Railway logs regularly
   - Set up alerts for downtime
   - Monitor database usage