FROM 10.17.65.13/baseimage/front
ADD ./dist/ /var/www/html/
EXPOSE 80
CMD ["sh","/etc/nginx/run.sh"]
